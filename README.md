# Landing page — Débora Ferraz

Página estática (HTML/CSS/JS, sem build). Rodar: `python3 -m http.server 8123` nesta pasta e abrir `http://localhost:8123/`. Log completo: [LOG_IMPLEMENTACAO.md](LOG_IMPLEMENTACAO.md).

Estrutura: `index.html` · `css/styles.css` · `js/config.js` (dados centrais) · `js/main.js` · `assets/` (fotos e fontes).

## Dados necessários antes de publicar (js/config.js)
**Status: versão para revisão — NÃO publicar enquanto houver pendências.**
- [x] WhatsApp (85) 99975-8643 (WhatsApp Business) — configurado
- [x] Número da OAB/CE: 29.9992 — configurado (confirmar o formato com a Débora)
- [x] E-mail contato@ferrazcampos.com.br — configurado (confirmar se o domínio ferrazcampos é o definitivo da marca)
- [x] Endereço: Rua Dr. Gilberto Studart, nº 55, Sala 113, Torre Norte, Cocó, Fortaleza-CE, CEP 60.192-105 — configurado
- Horário de atendimento: removido da página a pedido do cliente
- [x] Política de Privacidade padrão criada (`politica-de-privacidade.html`); falta revisão jurídica final da Débora e preencher e-mail/OAB. Atualizar se o site passar a usar analytics, pixels ou formulários
- [ ] Domínio definitivo → `og:image`, `og:url` e `canonical` (URL absoluta) no `<head>`
- [ ] Logo original em vetor/PNG (o PDF só traz a logo "Ferraz Campos" rasterizada em cartão; confirmar também se a marca será "Débora Ferraz" ou "Ferraz Campos")
- [ ] Validar com a cliente o catálogo de serviços, endereço e identificação profissional (nota da copy) e a conformidade com o Provimento 205/2021 da OAB
- [ ] Ao concluir: `modoRevisao: false` em `js/config.js`
- [ ] Dados estruturados (schema.org, bloco `application/ld+json` no `<head>` do `index.html`): acrescentar `url` e `image` quando estiverem confirmados (telefone, e-mail, endereço e redes já constam)
- Redes no rodapé (ícones, sem texto): Instagram, Facebook, Google e e-mail, configurados em `js/config.js` (`instagram`, `facebook`, `google`)
