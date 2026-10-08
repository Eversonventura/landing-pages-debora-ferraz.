(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var doc = document;
  var review = cfg.modoRevisao !== false;
  var digits = String(cfg.whatsapp || "").replace(/\D/g, "");
  // 55 + DDD (2) + número (8–9) = 12–13 dígitos
  var waOk = /^55\d{10,11}$/.test(digits);

  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }

  /* ---------- Pendências ---------- */
  var required = [
    ["whatsapp", "WhatsApp", waOk],
    ["oab", "número da OAB/CE", !!String(cfg.oab || "").trim()],
    ["email", "e-mail profissional", !!String(cfg.email || "").trim()],
    ["endereco", "endereço", !!String(cfg.endereco || "").trim()],
    ["privacidade", "Política de Privacidade", !!String(cfg.politicaPrivacidadeUrl || "").trim()]
  ];
  var missing = required.filter(function (r) { return !r[2]; });

  /* ---------- Campos configuráveis ---------- */
  function fmtPhone(d) {
    var m = d.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : d;
  }
  var values = {
    whatsapp: waOk ? fmtPhone(digits) : "",
    oab: String(cfg.oab || "").trim(),
    email: String(cfg.email || "").trim(),
    endereco: String(cfg.endereco || "").trim()
  };
  $$("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    var v = values[key];
    if (v) {
      el.textContent = v;
      if (key === "email") {
        var a = doc.createElement("a");
        a.href = "mailto:" + v; a.textContent = v; a.style.color = "inherit";
        el.textContent = ""; el.appendChild(a);
      }
    } else if (review) {
      el.classList.add("pendente");
    } else {
      var row = el.closest("[data-row]") || el.closest("p");
      if (row) row.hidden = true;
    }
  });

  /* Ícones de redes e contato */
  var social = {
    instagram: cfg.instagram,
    facebook: cfg.facebook,
    google: cfg.google,
    email: cfg.email ? "mailto:" + cfg.email : ""
  };
  $$("[data-social]").forEach(function (a) {
    var url = social[a.getAttribute("data-social")];
    if (!url) { a.hidden = true; return; }
    a.href = url;
    if (url.indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  });

  /* Política de Privacidade */
  var priv = $("#link-privacidade");
  if (priv) {
    if (cfg.politicaPrivacidadeUrl) {
      priv.href = cfg.politicaPrivacidadeUrl;
    } else if (review) {
      priv.classList.add("pendente");
      priv.setAttribute("aria-disabled", "true");
      priv.addEventListener("click", function (e) { e.preventDefault(); toast("Política de Privacidade pendente: informe a URL em js/config.js."); });
    } else {
      (priv.closest("[data-row]") || priv).hidden = true;
    }
  }

  var ano = $("#ano"); if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Faixa de revisão e noindex ---------- */
  if (review) {
    var bar = $("#review-bar");
    if (bar) {
      bar.hidden = false;
      bar.textContent = "Versão para revisão — não publicar. Pendências: " +
        (missing.length ? missing.map(function (m) { return m[1]; }).join(", ") : "nenhuma (defina modoRevisao como false)") +
        ". Edite js/config.js.";
    }
    var robots = doc.createElement("meta");
    robots.name = "robots"; robots.content = "noindex,nofollow";
    doc.head.appendChild(robots);
  } else if (missing.length && window.console) {
    console.error("[landing] Publicação com pendências obrigatórias: " + missing.map(function (m) { return m[1]; }).join(", "));
  }

  /* ---------- Toast ---------- */
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.hidden = true; }, 5000);
  }

  /* ---------- CTAs de WhatsApp ---------- */
  var msgs = cfg.mensagens || {};
  $$("[data-cta]").forEach(function (a) {
    var key = a.getAttribute("data-cta");
    if (waOk) {
      var url = "https://wa.me/" + digits;
      if (msgs[key]) url += "?text=" + encodeURIComponent(msgs[key]);
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    } else if (review) {
      a.setAttribute("role", "button");
      a.setAttribute("aria-describedby", "toast");
      a.addEventListener("click", function (e) { e.preventDefault(); toast("WhatsApp pendente: informe o número em js/config.js para ativar este botão."); });
    } else {
      a.hidden = true; // nunca publicar botão sem destino
    }
  });

  /* ---------- Menu mobile ---------- */
  var toggle = $("#nav-toggle"), nav = $("#nav");
  function setNav(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setNav(false); toggle.focus(); }
    });
  }

  /* ---------- FAQ (accordion) ---------- */
  $$(".faq__btn").forEach(function (btn) {
    var panel = doc.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.classList.toggle("is-open", !open);
    });
  });

  /* ---------- Problemas: abre no hover (mouse) e no clique/toque/teclado ---------- */
  $$(".pcard").forEach(function (card) {
    var btn = $(".pcard__btn", card), panel = $(".pcard__panel", card), pinned = false;
    function set(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.classList.toggle("is-open", open);
      card.classList.toggle("is-open", open);
    }
    card.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") set(true); });
    card.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse" && !pinned) set(false); });
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      // aberto só pelo hover: o clique fixa; aberto e fixo: o clique fecha
      if (open && pinned) { pinned = false; set(false); }
      else { pinned = true; set(true); }
    });
  });

  /* ---------- Reflexo do hero acompanha a rolagem ---------- */
  var heroEl = $(".hero");
  if (heroEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ticking = false;
    var updateShine = function () {
      ticking = false;
      var p = Math.min(1, Math.max(0, window.scrollY / (heroEl.offsetHeight * 0.9)));
      heroEl.style.setProperty("--shine", p.toFixed(3));
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateShine); }
    }, { passive: true });
    updateShine();
  }

  /* ---------- Link ativo na navegação ---------- */
  if ("IntersectionObserver" in window) {
    var map = {};
    $$(".nav a").forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        $$(".nav a").forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = map[en.target.id]; if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var t = doc.getElementById(id); if (t) spy.observe(t); });

    /* Entrada suave dos blocos */
    var targets = $$(".card, .pcard, .faq__item, .about, .group__head, .sec__head, .sec__close, .sec__note");
    targets.forEach(function (t) { t.classList.add("reveal"); });
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); rv.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (t) { rv.observe(t); });
  }
})();
