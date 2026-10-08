/*
 * Configuração central da landing page — Débora Ferraz
 *
 * Preencha os campos abaixo antes de publicar. Nada aqui é inventado:
 * campo vazio = pendência. Enquanto houver pendência obrigatória, mantenha
 * modoRevisao = true (a página mostra a faixa de revisão, marca os campos
 * pendentes e fica com noindex). Para publicar: preencher tudo e trocar
 * modoRevisao para false.
 */
window.SITE_CONFIG = {
  modoRevisao: true,

  // WhatsApp: DDI + DDD + número, só dígitos. Ex.: "5585999999999"
  whatsapp: "5585999758643",

  // Identificação profissional (somente o número; a página escreve "OAB/CE")
  oab: "29.9992",

  // Contato e atendimento (rodapé)
  email: "contato@ferrazcampos.com.br",
  endereco: "Rua Dr. Gilberto Studart, nº 55, Sala 113, Torre Norte, Bairro Cocó, CEP 60.192-105, Fortaleza-CE",

  // Redes e perfis (ícones no rodapé; vazio = ícone oculto)
  instagram: "https://www.instagram.com/deboraferraz.adv/",
  facebook: "https://www.facebook.com/profile.php?id=61594250282087",
  google: "https://share.google/kE9IlhoVDYdEiE6C2",

  // URL (ou caminho) da Política de Privacidade da cliente. Sem texto/URL
  // confirmados, o link do rodapé fica pendente.
  politicaPrivacidadeUrl: "politica-de-privacidade.html",

  // Mensagem pré-preenchida do WhatsApp, por origem do botão (data-cta)
  mensagens: {
    // Cada botão envia uma frase diferente, para saber de qual botão veio o contato
    hero: "Olá! Vim pelo site e gostaria de saber mais informações.",
    problemas: "Olá! Vim pelo site, li sobre dúvidas nos meus direitos e gostaria de entrar em contato para entender a minha situação.",
    trabalhista: "Olá! Tenho interesse em saber mais sobre direito trabalhista. Como podemos fazer?",
    previdenciario: "Olá! Tenho interesse em saber mais sobre direito previdenciário (INSS). Como podemos fazer?",
    faq: "Olá! Li as perguntas frequentes do site e ainda tenho dúvidas sobre a minha situação. Gostaria de informações sobre o atendimento e os documentos necessários."
  }
};
