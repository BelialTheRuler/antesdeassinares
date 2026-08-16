/* ============================================================
   ANTES DE ASSINARES — Configuração central de links de afiliado
   ------------------------------------------------------------
   SUBSTITUI cada "SEU_ID" pelo teu link de afiliado real
   (obtido no painel de cada programa após aprovação).
   Os CTAs do site usam estas URLs automaticamente.
   ============================================================ */
window.AFFILIATE_CONFIG = {
  brand: "Antes de Assinares",
  tagline: "Reviews honestos de ferramentas de IA, testadas com conta paga",
  contactEmail: "ola.ferramentasia@gmail.com", // ← e-mail dedicado (Gmail). Mudar quando tiverem domínio próprio.

  // URL base do site (sem barra final). Usado pelo build.js para gerar
  // canonical + hreflang + og:url absolutos. GitHub Pages (domínio grátis).
  siteUrl: "https://belialtheruler.github.io/antesdeassinares", // ← mudar se o repo tiver outro nome

  programs: {
    elevenlabs: {
      name: "ElevenLabs",
      url: "https://elevenlabs.io/?ref=SEU_ID", // <-- substituir
      note: "22% recorrente · 12 meses · cookie 90 dias",
    },
    heygen: {
      name: "HeyGen",
      url: "https://www.heygen.com/?via=SEU_ID", // <-- substituir
      note: "20% recorrente · 12 meses · cookie 60 dias",
    },
    writesonic: {
      name: "Writesonic",
      url: "https://writesonic.com/?via=SEU_ID", // <-- substituir
      note: "20% recorrente · 12 meses · cookie 60 dias",
    },
    rytr: {
      name: "Rytr",
      url: "https://rytr.me/?via=SEU_ID", // <-- substituir
      note: "30% recorrente · 12 meses · cookie 60 dias",
    },
    murf: {
      name: "Murf AI",
      url: "https://murf.ai/?via=SEU_ID", // <-- substituir
      note: "20% recorrente · 24 meses · cookie 90 dias",
    },
    hostinger: {
      name: "Hostinger",
      url: "https://www.hostinger.pt/?REFERRALCODE=SEU_ID", // <-- substituir
      note: "60% da 1ª venda · pagamento em EUR",
    },
  },

  disclosure:
    "Alguns links nesta página são de afiliados: se comprares através deles, recebemos uma comissão sem custo extra para ti. Só recomendamos ferramentas que testámos e usamos.",

  // Newsletter — liga aqui o formulário da home.
  // provider: null (guarda leads localmente até configurares) | "mailerlite" | "listmonk"
  newsletter: {
    provider: null,
    mailerlite: { webformId: "" }, // ← ID do webform (MailerLite → Forms → Embed → id)
    listmonk: { baseUrl: "", token: "", listId: "" }, // ← fase 1 (self-hosted)
  },
};
