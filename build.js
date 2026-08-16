/* ============================================================
   BUILD — gerador estático do site (todas as páginas).
   Lê o domínio real de `assets/affiliate-config.js` e gera:
   - home e sobre (PT + EN)
   - páginas de artigo (/reviews e /guias, PT + EN)
   - listagens (PT + EN)
   - og:image placeholder (assets/og/og-default.png)

   Canonical, hreflang, og:url e og:image são ESTÁTICOS no HTML
   (SEO internacional correto, sem injeção JS).

   Uso:  node build.js
   Mudou o domínio?  Edita siteUrl em affiliate-config.js e corre de novo.
   ============================================================ */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const articles = require("./content/articles.js");

const ROOT = __dirname;
const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>";

/* ---------- Config (lida do affiliate-config.js) ---------- */
const configSrc = fs.readFileSync(path.join(ROOT, "assets", "affiliate-config.js"), "utf8");
function configValue(key) {
  const m = configSrc.match(new RegExp(key + ':\\s*"([^"]+)"'));
  return m ? m[1] : "";
}
const siteUrl = (configValue("siteUrl") || "https://SEU-DOMINIO.pt").replace(/\/+$/, "");
const contactEmail = configValue("contactEmail") || "ola@SEU-DOMINIO.pt";
const brandName = configValue("brand") || "Antes de Assinares";
const brandTagline = configValue("tagline") || "Reviews honestos de ferramentas de IA, testadas com conta paga";

function programName(key) {
  const m = configSrc.match(new RegExp(key + ":\\s*\\{[\\s\\S]*?name:\\s*\"([^\"]+)\""));
  return m ? m[1] : key;
}

// JSON-LD — Organization (home/sobre) e Article/Review (artigos)
function orgSchema(lang, relPath) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: urlsFor(relPath).current,
    email: contactEmail,
    description: brandTagline,
    slogan: "Reviews honestos, testados, em português",
  };
}

function articleSchema(article, lang, relPath) {
  const u = urlsFor(relPath);
  const langCode = lang === "pt" ? "pt-PT" : "en";
  const org = { "@type": "Organization", name: brandName, url: siteUrl + "/index.html" };
  const nodes = [
    {
      "@type": "Article",
      headline: article.title[lang],
      description: article.meta[lang],
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: langCode,
      mainEntityOfPage: u.current,
      image: ogImage,
      articleSection: CATEGORY[article.category].tag[lang],
      author: org,
      publisher: org,
    },
  ];
  if (article.category === "review") {
    nodes.push({
      "@type": "Review",
      itemReviewed: { "@type": "Product", name: programName(article.affiliate), description: article.summary[lang] },
      reviewBody: article.intro[lang],
      author: org,
      datePublished: article.date,
      inLanguage: langCode,
    });
  }
  return { "@context": "https://schema.org", "@graph": nodes };
}

/* ---------- Categorias e línguas ---------- */
const CATEGORY = {
  review: { folder: "reviews", tag: { pt: "Review", en: "Review" }, tagGreen: false, link: { pt: "Ler o review →", en: "Read the review →" }, meta: { pt: "Review", en: "Review" } },
  comparacao: { folder: "reviews", tag: { pt: "Comparação", en: "Comparison" }, tagGreen: true, link: { pt: "Ler a comparação →", en: "Read the comparison →" }, meta: { pt: "Comparação", en: "Comparison" } },
  guia: { folder: "guias", tag: { pt: "Guia", en: "Guide" }, tagGreen: true, link: { pt: "Ler o guia →", en: "Read the guide →" }, meta: { pt: "Guia", en: "Guide" } },
};

const LANG = {
  // `disclosure` guarda a FRASE INTEIRA por língua (com {link} onde entra o
  // <a>). Já esteve partida em fragmentos — só o início era traduzido e as
  // 10 páginas EN diziam "This article contains links de afiliados — vê a nossa".
  pt: { attr: "pt-PT", ogLocale: "pt_PT", bodyLang: "", cookie: { aria: "Consentimento de cookies", msg: "Este site usa apenas cookies técnicos (localStorage). Não carregamos rastreadores de terceiros sem o teu consentimento.", accept: "Aceitar", decline: "Recusar" }, disclosure: { article: "Este artigo contém links de afiliados — vê a nossa {link}.", guide: "Este guia contém links de afiliados — vê a nossa {link}.", linkText: "política" } },
  en: { attr: "en", ogLocale: "en", bodyLang: ' data-lang="en"', cookie: { aria: "Cookie consent", msg: "This site only uses technical cookies (localStorage). We don't load third-party trackers without your consent.", accept: "Accept", decline: "Decline" }, disclosure: { article: "This article contains affiliate links — see our {link}.", guide: "This guide contains affiliate links — see our {link}.", linkText: "policy" } },
};

/* ---------- Helpers ---------- */
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* caminho relativo aos assets a partir da página (relPath = caminho desde a raiz do site) */
function assetsFor(relPath) {
  const depth = relPath.split("/").length; // "index.html"→1, "reviews/x.html"→2, "en/reviews/x.html"→3
  return depth <= 1 ? "./assets/" : "../".repeat(depth - 1) + "assets/";
}

function urlsFor(relPath) {
  const pt = siteUrl + "/" + relPath.replace(/^en\//, "");
  const en = siteUrl + "/en/" + relPath.replace(/^en\//, "");
  return { current: siteUrl + "/" + relPath, pt, en };
}

const ogImage = siteUrl + "/assets/og/og-default.png";

function head(title, meta, og, type, relPath, lang, schema) {
  const L = LANG[lang];
  const u = urlsFor(relPath);
  return (
    "<!doctype html>\n" +
    '<html lang="' + L.attr + '">\n' +
    "<head>\n" +
    '  <meta charset="utf-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    "  <title>" + esc(title) + "</title>\n" +
    '  <meta name="description" content="' + esc(meta) + '">\n' +
    // SEO internacional — estático, sem JS
    '  <link rel="canonical" href="' + u.current + '">\n' +
    '  <link rel="alternate" hreflang="pt-PT" href="' + u.pt + '">\n' +
    '  <link rel="alternate" hreflang="en" href="' + u.en + '">\n' +
    '  <link rel="alternate" hreflang="x-default" href="' + u.pt + '">\n' +
    '  <meta property="og:title" content="' + esc(og || title) + '">\n' +
    '  <meta property="og:description" content="' + esc(meta) + '">\n' +
    '  <meta property="og:type" content="' + type + '">\n' +
    '  <meta property="og:url" content="' + u.current + '">\n' +
    '  <meta property="og:locale" content="' + L.ogLocale + '">\n' +
    '  <meta property="og:locale:alternate" content="' + (lang === "pt" ? "en" : "pt_PT") + '">\n' +
    '  <meta property="og:image" content="' + ogImage + '">\n' +
    '  <link rel="stylesheet" href="' + assetsFor(relPath) + 'style.css">\n' +
    '  <link rel="icon" href="' + FAVICON + '">\n' +
    (schema ? '  <script type="application/ld+json">' + JSON.stringify(schema) + "</script>\n" : "") +
    "</head>\n"
  );
}

function scripts(relPath, extra) {
  const a = assetsFor(relPath);
  return (
    '\n  <script src="' + a + 'affiliate-config.js"></script>\n' +
    '  <script src="' + a + 'layout.js"></script>\n' +
    '  <script src="' + a + 'affiliate-links.js"></script>\n' +
    '  <script src="' + a + 'i18n.js"></script>\n' +
    '  <script src="' + a + 'cookie-banner.js"></script>\n' +
    '  <script src="' + a + 'motion.js"></script>\n' +
    (extra ? '  <script src="' + a + extra + '"></script>\n' : "") +
    "</body>\n</html>\n"
  );
}

function cookieBanner(lang) {
  const c = LANG[lang].cookie;
  return (
    '\n  <div id="cookie-banner" role="dialog" aria-label="' + c.aria + '">\n' +
    "    <p>" + c.msg + "</p>\n" +
    '    <div class="row">\n' +
    '      <button class="decline">' + c.decline + "</button>\n" +
    '      <button class="accept">' + c.accept + "</button>\n" +
    "    </div>\n" +
    "  </div>"
  );
}

/* Links internos entre artigos: escreve-se `[texto](slug)` no conteúdo e o
   build resolve para o caminho certo, com a categoria e a língua corretas.
   Existia texto a dizer "(temos review)" sem link nenhum para lá. */
function linkify(text, lang) {
  return String(text).replace(/\[([^\]]+)\]\(([a-z0-9-]+)\)/g, function (m, label, slug) {
    const target = articles.find((a) => a.slug === slug);
    if (!target) {
      throw new Error('Link interno para um slug que não existe: "' + slug + '" (texto: "' + label + '")');
    }
    // as páginas de artigo vivem em <cat>/<slug>.html, logo o vizinho está a ../
    return '<a href="../' + CATEGORY[target.category].folder + "/" + target.slug + '.html">' + label + "</a>";
  });
}

function renderSection(sec, lang) {
  let out = "";
  if (sec.h2) out += "<h2>" + sec.h2[lang] + "</h2>\n";
  if (sec.pc) {
    const prosLabel = lang === "pt" ? "Prós" : "Pros";
    const consLabel = lang === "pt" ? "Contras" : "Cons";
    out +=
      '<div class="pc">\n' +
      '  <div class="pros">\n' +
      "    <h3>" + prosLabel + "</h3>\n" +
      "    <ul>" + sec.pc.pros[lang].map((i) => "<li>" + i + "</li>").join("\n") + "</ul>\n" +
      "  </div>\n" +
      '  <div class="cons">\n' +
      "    <h3>" + consLabel + "</h3>\n" +
      "    <ul>" + sec.pc.cons[lang].map((i) => "<li>" + i + "</li>").join("\n") + "</ul>\n" +
      "  </div>\n" +
      "</div>\n";
  }
  if (sec.p) {
    const paras = Array.isArray(sec.p[lang]) ? sec.p[lang] : [sec.p[lang]];
    out += paras.map((para) => "<p>" + linkify(para, lang) + "</p>\n").join("");
  }
  if (sec.ul) out += "<ul>\n" + sec.ul[lang].map((i) => "  <li>" + linkify(i, lang) + "</li>").join("\n") + "\n</ul>\n";
  if (sec.blockquote) out += "<blockquote>" + linkify(sec.blockquote[lang], lang) + "</blockquote>\n";
  return out;
}

/* ---------- Página de artigo ---------- */
function articlePage(article, lang) {
  const cat = CATEGORY[article.category];
  const rel = (lang === "en" ? "en/" : "") + cat.folder + "/" + article.slug + ".html";
  const L = LANG[lang];
  const kind = article.category === "guia" ? "guide" : "article";
  const title = article.title[lang] + " | " + brandName;
  const metaLine =
    lang === "pt"
      ? cat.meta.pt + " · Atualizado em " + article.updated.pt + " · Leitura: " + article.readMin + " min"
      : cat.meta.en + " · Updated " + article.updated.en + " · " + article.readMin + " min read";

  /* O veredicto sobe para o topo. Estava em último, e o princípio do projeto é
     "o veredicto antes do detalhe: o leitor decide sem ler o artigo todo".
     Não é duplicado — é movido, e o resto do artigo passa a ser a prova. */
  const verdictIdx = article.sections.findIndex(
    (s) => s.h2 && (s.h2.pt === "Veredicto" || s.h2.en === "Verdict")
  );
  let verdict = "";
  if (verdictIdx !== -1) {
    const v = article.sections[verdictIdx];
    const paras = Array.isArray(v.p[lang]) ? v.p[lang] : [v.p[lang]];
    verdict =
      '\n      <aside class="verdict">\n' +
      "        <h2>" + v.h2[lang] + "</h2>\n" +
      paras.map((p) => "        <p>" + linkify(p, lang) + "</p>\n").join("") +
      "      </aside>\n";
  }

  let sections = "";
  article.sections.forEach((sec, i) => {
    if (i === verdictIdx) return;
    sections += renderSection(sec, lang);
  });

  /* O artigo acabava no CTA de afiliado: quem não clicasse, saía. Agora há
     passo seguinte — mesma categoria primeiro, porque quem lê uma review de voz
     está a comparar vozes, não a mudar de assunto. */
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const same = (x) => (x.category === article.category ? 0 : 1);
      return same(a) - same(b) || (a.date < b.date ? 1 : -1);
    })
    .slice(0, 3);

  const relatedBlock =
    '\n      <nav class="related" aria-label="' + (lang === "pt" ? "Continuar a decidir" : "Keep deciding") + '">\n' +
    "        <h2>" + (lang === "pt" ? "Continua a decidir" : "Keep deciding") + "</h2>\n" +
    '        <ul>\n' +
    related
      .map(
        (a) =>
          '          <li><a href="../' + CATEGORY[a.category].folder + "/" + a.slug + '.html">' +
          '<span class="related-kind">' + CATEGORY[a.category].tag[lang] + "</span>" +
          a.title[lang] + "</a></li>"
      )
      .join("\n") +
    "\n        </ul>\n      </nav>\n";

  let cta = "";
  if (article.cta) {
    cta =
      '\n      <div class="cta">\n' +
      "        <h3>" + article.cta.title[lang] + "</h3>\n" +
      "        <p>" + article.cta.text[lang] + "</p>\n" +
      '        <a class="btn" data-aff="' + article.affiliate + '" href="#">' + article.cta.button[lang] + "</a>\n" +
      (article.cta.note
        ? '        <p class="muted mt-1" style="font-size:var(--t-label);">' + article.cta.note[lang] + "</p>\n"
        : "") +
      "      </div>\n";
  }

  return (
    head(title, article.meta[lang], article.og[lang], "article", rel, lang, articleSchema(article, lang, rel)) +
    '<body data-page="' + cat.folder + '"' + L.bodyLang + ">\n" +
    "  <div data-header></div>\n" +
    '\n  <main class="wrap">\n' +
    '    <article class="prose">\n' +
    "      <h1>" + article.title[lang] + "</h1>\n" +
    '      <p class="meta">' + metaLine + "</p>\n" +
    '\n      <span class="disclosure">⚖️ ' +
    L.disclosure[kind].replace("{link}", '<a href="../sobre.html">' + L.disclosure.linkText + "</a>") +
    "</span>\n" +
    "\n      <p>" + article.intro[lang] + "</p>\n" +
    verdict +
    (article.imgSrc
      ? '\n      <img class="article-img" src="' +
        (lang === "en" ? "../../" : "../") +
        article.imgSrc +
        '" alt="' +
        article.img[lang] +
        '">\n'
      : '\n      <div class="placeholder-img" style="aspect-ratio: 16/6; background: linear-gradient(120deg, var(--ph-bg-a), var(--ph-bg-b)); display:flex; align-items:center; justify-content:center; color:var(--ph-fg); font-weight:700;">' +
        article.img[lang] +
        "</div>\n") +
    "\n" +
    sections +
    cta +
    '\n      <p class="muted" style="font-size:var(--t-body);"><em>' + article.note[lang] + "</em></p>\n" +
    relatedBlock +
    "    </article>\n" +
    "  </main>\n" +
    "\n  <div data-footer></div>" +
    cookieBanner(lang) +
    scripts(rel)
  );
}

/* ---------- Listagens ---------- */
function listingPage(kind, lang) {
  const isReviews = kind === "reviews";
  const rel = (lang === "en" ? "en/" : "") + kind + "/index.html";
  const items = articles.filter((a) => (isReviews ? a.category !== "guia" : a.category === "guia"));

  const title = (lang === "pt" ? (isReviews ? "Reviews" : "Guias") : (isReviews ? "Reviews" : "Guides")) + " | " + brandName;
  const h1 = lang === "pt" ? (isReviews ? "Reviews" : "Guias") : isReviews ? "Reviews" : "Guides";
  const intro =
    lang === "pt"
      ? isReviews
        ? "Análises honestas: testamos, usamos, e dizemos se vale a pena — com o que correu bem e o que correu mal."
        : "Passo a passo para começar a usar IA hoje — sem jargão técnico."
      : isReviews
        ? "Honest analysis: we test, we use, and we tell you if it's worth it — including what went wrong."
        : "Step by step to start using AI today — no technical jargon.";
  const comingSoon = lang === "pt" ? "Em breve: Semrush, Systeme.io…" : "Coming soon: Semrush, Systeme.io…";
  const metaDesc =
    lang === "pt"
      ? isReviews
        ? "Todos os reviews de ferramentas de IA: análise honesta, prós e contras, preços e veredicto."
        : "Guias passo a passo para usar ferramentas de IA no teu trabalho ou negócio, em português."
      : isReviews
        ? "All our AI tool reviews: honest analysis, pros and cons, pricing and a clear verdict."
        : "Step-by-step guides to start using AI tools in your work or business.";

  const cards = items
    .map((a) => {
      const cat = CATEGORY[a.category];
      return (
        '<div class="card">\n' +
        '  <span class="tag' + (cat.tagGreen ? " green" : "") + '">' + cat.tag[lang] + "</span>\n" +
        // h2: nas listagens os cards são filhos diretos do <h1> da página.
        // (Na home são <h3>, porque lá existe um <h2> de secção por cima.)
        "  <h2>" + a.title[lang] + "</h2>\n" +
        "  <p>" + a.summary[lang] + "</p>\n" +
        '  <a href="' + a.slug + '.html">' + cat.link[lang] + "</a>\n" +
        "</div>"
      );
    })
    .join("\n");

  return (
    head(title, metaDesc, metaDesc, "website", rel, lang) +
    '<body data-page="' + kind + '"' + LANG[lang].bodyLang + ">\n" +
    "  <div data-header></div>\n" +
    '\n  <main class="wrap">\n' +
    "    <h1>" + h1 + "</h1>\n" +
    '    <p class="muted" style="font-size:var(--t-body);">' + intro + "</p>\n" +
    '\n    <div class="grid">\n' +
    cards +
    "\n    </div>\n" +
    '\n    <p class="muted mt-3">' + comingSoon + "</p>\n" +
    "  </main>\n" +
    "\n  <div data-footer></div>" +
    cookieBanner(lang) +
    scripts(rel)
  );
}

/* ---------- Home ---------- */
const HOME = {
  pt: {
    title: "Antes de Assinares — Reviews honestos de ferramentas de IA, em português",
    meta: "Reviews honestas e guias práticos de ferramentas de IA (escrita, voz, vídeo) para criadores de conteúdo e pequenas empresas — em português.",
    og: "Reviews honestas e guias práticos de ferramentas de IA para criadores e pequenas empresas.",
    heroDeco: "✦",
    stickers: [
      { text: "HONESTO.", cls: "sticker-pink", top: "70px", left: "4%" },
      { text: "TESTADO 2026", cls: "sticker-acid", top: "150px", left: "12%" },
      { text: "PT-PT", cls: "sticker-blue", top: "200px", left: "3%" },
    ],
    h1: "Ferramentas de IA que <em>realmente</em> valem a pena",
    lede: "Sem listas genéricas. Sem afiliações escondidas. <strong>Testamos cada ferramenta</strong>, dizemos o que é bom, o que é mau, e para quem faz sentido.",
    ctaReviews: "Ver os reviews →",
    ctaGuides: "Ler os guias",
    manifestoTitle: "Não fazemos listas de «10 ferramentas». Fazemos testes.",
    manifestoText: "A maioria dos sites de afiliados vende-te tudo. Nós apontamos o que falhou em cada ferramenta — porque é isso que te poupa dinheiro e nos dá credibilidade.",
    s1Title: "Três formatos, zero rodeios",
    s1Cards: [
      { tag: "Reviews", title: "Análises honestas", text: "Prós, contras, preços e alternativas de cada ferramenta. Incluímos o que <em>não</em> gostámos — porque é isso que te poupa dinheiro.", link: "reviews/index.html", linkLabel: "Ver reviews →" },
      { tag: "Guias", green: true, title: "Passo a passo", text: "Tutoriais práticos para começares a usar IA no teu trabalho ou negócio, sem jargão técnico.", link: "guias/index.html", linkLabel: "Ver guias →" },
      { tag: "Comparações", title: "X vs Y, sem rodeios", text: "Comparações diretas entre ferramentas concorrentes, com o veredicto claro sobre qual escolher.", link: null, linkLabel: "Ver comparação →" },
    ],
    s2Title: "O que acabámos de testar",
    newsletterTitle: "Recebe o guia gratuito: «5 ferramentas de IA para começar hoje»",
    newsletterText: "Resumo mensal com o que testámos. Sem spam — prometido e assinado.",
    newsletterPlaceholder: "o-teu@email.pt",
    newsletterAria: "O teu email para a newsletter",
    newsletterBtn: "Receber o guia",
    newsletterOk: "Recebido! Vamos avisar-te quando a lista estiver no ar.",
    newsletterErr: "Email inválido — verifica e tenta outra vez.",
  },
  en: {
    title: "Antes de Assinares — Honest reviews of AI tools, tested on a paid account",
    meta: "Honest reviews and practical guides of AI tools (writing, voice, video) for content creators and small businesses.",
    og: "We test every tool, tell you what's good, what's bad, and who it's for.",
    heroDeco: "✦",
    stickers: [
      { text: "HONEST.", cls: "sticker-pink", top: "70px", left: "4%" },
      { text: "TESTED 2026", cls: "sticker-acid", top: "150px", left: "12%" },
      { text: "EN", cls: "sticker-blue", top: "200px", left: "3%" },
    ],
    h1: "AI tools that are <em>actually</em> worth it",
    lede: "No generic listicles. No hidden affiliations. <strong>We test every tool</strong>, tell you what's good, what's bad, and who it's for.",
    ctaReviews: "See the reviews →",
    ctaGuides: "Read the guides",
    manifestoTitle: "We don't do «top 10» listicles. We test things.",
    manifestoText: "Most affiliate sites try to sell you everything. We point out what failed in every tool — because that's what saves you money and earns us credibility.",
    s1Title: "Three formats, zero fluff",
    s1Cards: [
      { tag: "Reviews", title: "Honest analysis", text: "Pros, cons, pricing and alternatives for every tool. We include what we <em>didn't</em> like — because that's what saves you money.", link: "reviews/index.html", linkLabel: "See reviews →" },
      { tag: "Guides", green: true, title: "Step by step", text: "Practical tutorials to start using AI in your work or business, without jargon.", link: "guias/index.html", linkLabel: "See guides →" },
      { tag: "Comparisons", title: "X vs Y, no fluff", text: "Head-to-head comparisons of competing tools, with a clear verdict on which to pick.", link: null, linkLabel: "See comparison →" },
    ],
    s2Title: "What we just tested",
    newsletterTitle: "Get the free guide: «5 AI tools to start with today»",
    newsletterText: "A monthly summary of what we tested. No spam — promised and signed.",
    newsletterPlaceholder: "your@email.com",
    newsletterAria: "Your email for the newsletter",
    newsletterBtn: "Get the guide",
    newsletterOk: "Got it! We'll let you know when the list is live.",
    newsletterErr: "Invalid email — check and try again.",
  },
};

function homePage(lang) {
  const rel = lang === "en" ? "en/index.html" : "index.html";
  const L = HOME[lang];
  const a = assetsFor(rel);

  // Destaques: os 3 artigos mais recentes (por date, decrescente).
  // Sem date, a ordem do array serve de fallback (localeCompare de vazios = 0).
  const byDateDesc = (a, b) => (b.date || "").localeCompare(a.date || "");
  const featured = articles.slice().sort(byDateDesc).slice(0, 3);
  const firstOf = (cat) => articles.find((x) => x.category === cat);
  const artPrefix = lang === "en" ? "../" : "";

  const featuredCards = featured
    .map((art) => {
      const cat = CATEGORY[art.category];
      return (
        '<div class="card">\n' +
        '  <span class="tag' + (cat.tagGreen ? " green" : "") + '">' + cat.tag[lang] + "</span>\n" +
        "  <h3>" + art.title[lang] + "</h3>\n" +
        "  <p>" + art.summary[lang] + "</p>\n" +
        '  <a href="' + artPrefix + cat.folder + "/" + art.slug + '.html">' + cat.link[lang] + "</a>\n" +
        "</div>"
      );
    })
    .join("\n");

  const s1 = L.s1Cards
    .map((c, i) => {
      let link = c.link;
      if (!link) {
        const cmp = firstOf("comparacao");
        link = artPrefix + (cmp ? CATEGORY[cmp.category].folder + "/" + cmp.slug + ".html" : "#");
      } else if (lang === "en" && link !== "#") {
        link = "../" + link;
      }
      return (
        '<div class="card">\n' +
        '  <span class="tag' + (c.green ? " green" : "") + '">' + c.tag + "</span>\n" +
        "  <h3>" + c.title + "</h3>\n" +
        "  <p>" + c.text + "</p>\n" +
        '  <a href="' + link + '">' + c.linkLabel + "</a>\n" +
        "</div>"
      );
    })
    .join("\n");

  // Sem top/left fixos: estavam em position:absolute e, mal o h1 crescia, o
  // "TESTADO 2026" caía por cima do título. Agora são uma fila no fluxo,
  // acima do h1 — colam na mesma, mas nunca tapam nada.
  const stickers = L.stickers
    .map((s) => '<span class="sticker ' + s.cls + '">' + s.text + "</span>")
    .join("\n      ");

  return (
    head(L.title, L.meta, L.og, "website", rel, lang, orgSchema(lang, rel)) +
    '<body data-page="inicio"' + LANG[lang].bodyLang + ">\n" +
    "  <div data-header></div>\n" +
    '\n  <section class="hero">\n' +
    '    <span class="hero-deco" aria-hidden="true">' + L.heroDeco + "</span>\n" +
    '    <div class="wrap">\n' +
    '      <p class="stickers">' + stickers + "</p>\n" +
    "      <h1>" + L.h1 + "</h1>\n" +
    '      <p class="lede">' + L.lede + "</p>\n" +
    '      <div class="hero-ctas">\n' +
    '        <a class="btn" href="' + (lang === "en" ? "../reviews/index.html" : "reviews/index.html") + '">' + L.ctaReviews + "</a>\n" +
    '        <a class="btn secondary" href="' + (lang === "en" ? "../guias/index.html" : "guias/index.html") + '">' + L.ctaGuides + "</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </section>\n" +
    '\n  <main class="wrap">\n' +
    '\n    <section class="band">\n' +
    // Sem eyebrow nem número de secção: "Manifesto 00" por cima de "NÃO
    // FAZEMOS LISTAS DE 10 FERRAMENTAS" não acrescentava nada ao título, e a
    // sequência 00/01/02 não era sequência nenhuma. O h2 carrega-se sozinho.
    '      <h2 class="block-title">' + L.manifestoTitle + "</h2>\n" +
    '      <p style="max-width: 62ch;">' + L.manifestoText + "</p>\n" +
    "    </section>\n" +
    '\n    <section class="band band-tint">\n' +
    '      <h2 class="block-title">' + L.s1Title + "</h2>\n" +
    '      <div class="grid">\n' +
    s1 +
    "\n      </div>\n" +
    "    </section>\n" +
    '\n    <section class="band">\n' +
    '      <h2 class="block-title">' + L.s2Title + "</h2>\n" +
    '      <div class="grid">\n' +
    featuredCards +
    "\n      </div>\n" +
    "    </section>\n" +
    '\n    <section class="band band-tint">\n' +
    '      <div class="cta">\n' +
    "        <h3>" + L.newsletterTitle + "</h3>\n" +
    "        <p>" + L.newsletterText + "</p>\n" +
    '        <form id="newsletter-form" method="post" data-ok="' + L.newsletterOk + '" data-err="' + L.newsletterErr + '" style="display:flex; gap:12px; flex-wrap:wrap;">\n' +
    '          <input type="email" name="email" placeholder="' + L.newsletterPlaceholder + '" aria-label="' + L.newsletterAria + '" required style="font-family:var(--font-mono); font-size:var(--t-body); padding:14px 16px; border:3px solid var(--line); background:var(--card); box-shadow:4px 4px 0 var(--pink); min-width:240px; flex:1;">\n' +
    '          <button class="btn on-dark" type="submit">' + L.newsletterBtn + "</button>\n" +
    '          <p class="newsletter-msg" aria-live="polite" style="flex-basis:100%; margin:4px 0 0;"></p>\n' +
    "        </form>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "\n  </main>\n" +
    "\n  <div data-footer></div>" +
    cookieBanner(lang) +
    scripts(rel, "newsletter.js")
  );
}

/* ---------- Sobre ---------- */
const SOBRE = {
  pt: {
    title: "Sobre e política de divulgação | " + brandName,
    meta: "Quem somos, como testamos as ferramentas e a nossa política de links de afiliados (disclosure).",
    og: "Quem somos, como testamos as ferramentas e a nossa política de links de afiliados (disclosure).",
    h1: "Quem somos e como testamos",
    sections: [
      { h2: "Quem somos", p: "Somos um pequeno projeto português que testa ferramentas de IA e publica reviews e guias honestos, em português. Não somos afiliados de ninguém que não tenhamos usado — e dizemos quando uma ferramenta <em>não</em> vale a pena, mesmo que isso signifique menos comissão." },
      { h2: "Como testamos", ul: ["Testamos com contas reais (gratuitas ou pagas) — nunca só com demos.", "Publicamos prós e contras, incluindo o que correu mal.", "Atualizamos os preços e o veredicto regularmente.", "Separamos opinião de facto: se é opinião, dizemos que é."] },
      { h2: "Política de afiliados (disclosure)", p: "Alguns links no site são links de afiliados. Se comprares através deles, recebemos uma comissão — <strong>sem custo extra para ti</strong>.", ul: ["Cada artigo indica, no topo, que contém links de afiliados.", "Os links de afiliado nunca mudam o preço que pagas.", "Nunca recomendamos uma ferramenta só por pagar comissão. Se não gostamos, não recomendamos.", "Onde houver dois programas concorrentes, apresentamos ambos com os seus próprios links."] },
      { h2: "Privacidade", p: "Este site não carrega rastreadores de terceiros sem consentimento. Usamos apenas armazenamento local (localStorage) para recordar as tuas preferências — como o banner de cookies mostra. Se um dia adicionarmos análise de tráfego, pedimos consentimento antes." },
      { h2: "Contacto", p: "Dúvidas, sugestões ou ferramentas para testarmos? Escreve para <strong>" + contactEmail + "</strong>." },
    ],
  },
  en: {
    title: "About and disclosure policy | " + brandName,
    meta: "Who we are, how we test tools and our affiliate link (disclosure) policy.",
    og: "Who we are, how we test tools and our affiliate link (disclosure) policy.",
    h1: "Who we are and how we test",
    sections: [
      { h2: "Who we are", p: "We're a small project that tests AI tools and publishes honest reviews and guides. We don't affiliate with anyone we haven't used — and we tell you when a tool is <em>not</em> worth it, even if that means less commission." },
      { h2: "How we test", ul: ["We test with real accounts (free or paid) — never just demos.", "We publish pros and cons, including what went wrong.", "We update pricing and verdicts regularly.", "We separate opinion from fact: if it's opinion, we say so."] },
      { h2: "Affiliate policy (disclosure)", p: "Some links on this site are affiliate links. If you buy through them, we earn a commission — <strong>at no extra cost to you</strong>.", ul: ["Every article states at the top that it contains affiliate links.", "Affiliate links never change the price you pay.", "We never recommend a tool just because it pays a commission.", "When there are competing programs, we present both with their own links."] },
      { h2: "Privacy", p: "This site doesn't load third-party trackers without consent. We only use local storage to remember your preferences — as the cookie banner shows. If we ever add traffic analytics, we'll ask for consent first." },
      { h2: "Contact", p: "Questions, suggestions or tools you want us to test? Write to <strong>" + contactEmail + "</strong>." },
    ],
  },
};

function sobrePage(lang) {
  const rel = lang === "en" ? "en/sobre.html" : "sobre.html";
  const S = SOBRE[lang];
  const body = S.sections
    .map((s) => {
      let out = "<h2>" + s.h2 + "</h2>\n";
      if (s.p) out += "<p>" + s.p + "</p>\n";
      if (s.ul) out += "<ul>\n" + s.ul.map((i) => "  <li>" + i + "</li>").join("\n") + "\n</ul>\n";
      return out;
    })
    .join("");

  return (
    head(S.title, S.meta, S.og, "website", rel, lang, orgSchema(lang, rel)) +
    '<body data-page="sobre"' + LANG[lang].bodyLang + ">\n" +
    "  <div data-header></div>\n" +
    '\n  <main class="wrap">\n' +
    '    <article class="prose">\n' +
    "      <h1>" + S.h1 + "</h1>\n" +
    body +
    "    </article>\n" +
    "  </main>\n" +
    "\n  <div data-footer></div>" +
    cookieBanner(lang) +
    scripts(rel)
  );
}

/* ---------- og:image (PNG sólido 1200×630, sem dependências) ---------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}
function solidPng(width, height, rgb) {
  const row = Buffer.alloc(1 + width * 3);
  for (let x = 0; x < width; x++) {
    row[1 + x * 3] = rgb[0];
    row[2 + x * 3] = rgb[1];
    row[3 + x * 3] = rgb[2];
  }
  const raw = Buffer.concat(Array.from({ length: height }, () => row));
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolor RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- PNG com texto — fonte de pixels 5x7 (sem dependências) ---------- */
const FONT5x7 = {
  A: [0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11], B: [0x1e, 0x11, 0x11, 0x1e, 0x11, 0x11, 0x1e],
  C: [0x0e, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0e], D: [0x1c, 0x12, 0x11, 0x11, 0x11, 0x12, 0x1c],
  E: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x1f], F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
  G: [0x0e, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0f], H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  I: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x1f], J: [0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0c],
  K: [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11], L: [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f],
  M: [0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11], N: [0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11],
  O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e], P: [0x1e, 0x11, 0x11, 0x1e, 0x10, 0x10, 0x10],
  Q: [0x0e, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0d], R: [0x1e, 0x11, 0x11, 0x1e, 0x14, 0x12, 0x11],
  S: [0x0f, 0x10, 0x10, 0x0e, 0x01, 0x01, 0x1e], T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  U: [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e], V: [0x11, 0x11, 0x11, 0x11, 0x11, 0x0a, 0x04],
  W: [0x11, 0x11, 0x11, 0x15, 0x15, 0x1b, 0x11], X: [0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11],
  Y: [0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04], Z: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1f],
  "0": [0x0e, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0e], "1": [0x04, 0x0c, 0x04, 0x04, 0x04, 0x04, 0x0e],
  "2": [0x0e, 0x11, 0x01, 0x02, 0x04, 0x08, 0x1f], "3": [0x1e, 0x01, 0x01, 0x0e, 0x01, 0x01, 0x1e],
  "4": [0x02, 0x06, 0x0a, 0x12, 0x1f, 0x02, 0x02], "5": [0x1f, 0x10, 0x1e, 0x01, 0x01, 0x01, 0x1e],
  "6": [0x06, 0x08, 0x10, 0x1e, 0x11, 0x11, 0x0e], "7": [0x1f, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08],
  "8": [0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e], "9": [0x0e, 0x11, 0x11, 0x0f, 0x01, 0x02, 0x0c],
  ".": [0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06], "-": [0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00],
  "!": [0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x04], " ": [0, 0, 0, 0, 0, 0, 0],
};

function textWidth(text, scale) {
  return text.length * 6 * scale - scale;
}

function makeCanvas(width, height) {
  const buf = Buffer.alloc(width * height * 3);
  return {
    w: width,
    h: height,
    set(x, y, rgb) {
      if (x < 0 || y < 0 || x >= width || y >= height) return;
      const i = (y * width + x) * 3;
      buf[i] = rgb[0]; buf[i + 1] = rgb[1]; buf[i + 2] = rgb[2];
    },
    rect(x0, y0, x1, y1, rgb) {
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) this.set(x, y, rgb);
    },
    text(text, x, y, scale, rgb) {
      let cx = x;
      for (const ch of text) {
        const glyph = FONT5x7[ch] || FONT5x7[" "];
        for (let gy = 0; gy < 7; gy++) {
          const row = glyph[gy];
          for (let gx = 0; gx < 5; gx++) {
            if (row & (16 >> gx)) {
              for (let sy = 0; sy < scale; sy++)
                for (let sx = 0; sx < scale; sx++) this.set(cx + gx * scale + sx, y + gy * scale + sy, rgb);
            }
          }
        }
        cx += 6 * scale;
      }
      return cx;
    },
    toPng() {
      const ihdr = Buffer.alloc(13);
      ihdr.writeUInt32BE(width, 0);
      ihdr.writeUInt32BE(height, 4);
      ihdr[8] = 8;
      ihdr[9] = 2;
      const raw = Buffer.alloc(height * (1 + width * 3));
      for (let y = 0; y < height; y++) {
        raw[y * (1 + width * 3)] = 0;
        buf.copy(raw, y * (1 + width * 3) + 1, y * width * 3, (y + 1) * width * 3);
      }
      return Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
        pngChunk("IHDR", ihdr),
        pngChunk("IDAT", zlib.deflateSync(raw)),
        pngChunk("IEND", Buffer.alloc(0)),
      ]);
    },
  };
}

function brandedPng() {
  const W = 1200, H = 630;
  const acid = [0xc8, 0xff, 0x4d], black = [0, 0, 0];
  const c = makeCanvas(W, H);
  c.rect(0, 0, W - 1, H - 1, acid);
  // moldura brutalista
  c.rect(0, 0, W - 1, 26, black);
  c.rect(0, H - 27, W - 1, H - 1, black);
  c.rect(0, 0, 26, H - 1, black);
  c.rect(W - 27, 0, W - 1, H - 1, black);
  // título
  const t1 = "ANTES DE";
  c.text(t1, (W - textWidth(t1, 16)) / 2, 80, 16, black);
  const t2 = "ASSINARES";
  c.text(t2, (W - textWidth(t2, 14)) / 2, 235, 14, black);
  const t3 = "REVIEWS HONESTOS";
  c.text(t3, (W - textWidth(t3, 8)) / 2, 480, 8, black);
  const t4 = "HONESTO. TESTADO 2026.";
  c.text(t4, (W - textWidth(t4, 6)) / 2, 550, 6, black);
  return c.toPng();
}

/* ---------- Validação ---------- */
function configPrograms() {
  const m = configSrc.match(/programs:\s*\{([\s\S]*?)\n  \}/);
  if (!m) return null;
  const keys = [];
  const re = /([a-zA-Z0-9_]+):\s*\{/g;
  let mm;
  while ((mm = re.exec(m[1]))) keys.push(mm[1]);
  return keys;
}

function validate() {
  const warnings = [];
  const errors = [];

  // 1) Slugs duplicados — erro (ambíguo: os ficheiros seriam sobrescritos).
  const seen = new Map();
  articles.forEach((a) => {
    if (seen.has(a.slug)) {
      errors.push(
        'Slug duplicado: "' + a.slug + '" (categorias "' + seen.get(a.slug) + '" e "' + a.category + '")'
      );
    }
    seen.set(a.slug, a.category);
  });

  // 2) Affiliate da CTA/links deve existir na config — aviso.
  const programs = configPrograms();
  articles.forEach((a) => {
    if (!a.affiliate) return;
    if (!programs) {
      warnings.push(a.slug + ': não consegui ler os programas em affiliate-config.js — verifica o formato');
      return;
    }
    if (programs.indexOf(a.affiliate) === -1) {
      warnings.push(
        a.slug + ': affiliate "' + a.affiliate + '" não existe em affiliate-config.js (programas: ' + programs.join(', ') + ')'
      );
    }
  });

  // 3) Campos obrigatórios e campos bilingues PT/EN — aviso.
  const REQUIRED = ['slug', 'category', 'date', 'title', 'meta', 'og', 'summary', 'intro', 'img', 'updated', 'note', 'sections'];
  const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

  function langIssues(v, path) {
    const issues = [];
    ['pt', 'en'].forEach((lang) => {
      const val = v[lang];
      const present = typeof val !== 'undefined';
      const ok =
        present &&
        (typeof val === 'string'
          ? val.trim().length > 0
          : Array.isArray(val) && val.length > 0 && val.every((i) => typeof i === 'string' && i.trim().length > 0));
      if (!ok) issues.push(path + '.' + lang + (present ? ' (vazio)' : ' (em falta)'));
    });
    return issues;
  }

  // Percorre a estrutura; qualquer objeto com chave "pt" ou "en" é um campo
  // bilingue (e apanha o caso de uma das línguas estar em falta).
  function walk(slug, path, v) {
    if (!v || typeof v !== 'object') return;
    if ('pt' in v || 'en' in v) {
      langIssues(v, path).forEach((i) => warnings.push(slug + ': ' + i));
      return;
    }
    Object.keys(v).forEach((k) => walk(slug, path + '.' + k, v[k]));
  }

  articles.forEach((a) => {
    if (!a || typeof a !== 'object') {
      errors.push('Entrada inválida em content/articles.js (não é um objeto)');
      return;
    }
    REQUIRED.forEach((f) => {
      if (typeof a[f] === 'undefined') {
        warnings.push((a.slug || '?') + ': campo obrigatório "' + f + '" em falta');
      }
    });
    if (typeof a.date !== 'undefined' && !DATE_RE.test(a.date)) {
      warnings.push(a.slug + ': campo "date" deve ser YYYY-MM-DD (recebido: "' + a.date + '")');
    }
    if (a.slug) walk(a.slug, a.slug, a);
  });

  // 4) Contraste WCAG AA nos dois modos — erro (texto ilegível é um bug).
  contrastIssues().forEach((i) => errors.push(i));

  return { warnings, errors };
}

/* ---------- Contraste (WCAG AA) ---------- */
/* Guarda automática contra regressões de dark mode. Lê os tokens de cor do
   style.css nos dois modos e verifica cada par texto/fundo que o design usa.
   Falha o build: uma cor ilegível é um bug, não um aviso.
   Se acrescentares um par de cores novo ao CSS, acrescenta-o também a PAIRS. */

function tokensFor() {
  const css = fs.readFileSync(path.join(ROOT, "assets", "style.css"), "utf8");
  function block(selector) {
    const m = css.match(new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\{([^}]*)\\}"));
    const out = {};
    if (!m) return out;
    m[1].replace(/--([\w-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\s*;/g, (_, k, v) => (out[k] = v));
    return out;
  }
  const light = block(":root");
  // o modo escuro redefine só alguns tokens; os restantes herdam de :root
  return light; // o site deixou de ter modo escuro
}

function relLum(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const ch = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrast(a, b) {
  const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Auto-verificação da fórmula contra valores de referência do WCAG. Corre em
// cada build: se contrast() partir, o build pára aqui em vez de aprovar cores
// ilegíveis em silêncio. (#767676 sobre branco é o limiar canónico de AA.)
[["#000000", "#ffffff", 21], ["#ffffff", "#ffffff", 1], ["#767676", "#ffffff", 4.54]].forEach(
  ([a, b, expected]) => {
    if (Math.abs(contrast(a, b) - expected) > 0.01) {
      throw new Error("contrast(): fórmula WCAG partida — " + a + " sobre " + b + " deu " + contrast(a, b).toFixed(2) + ", esperado " + expected);
    }
  }
);

// min 4.5 = texto normal (AA); min 3 = texto grande e elementos não-textuais.
const CONTRAST_PAIRS = [
  { fg: "fg", bg: "bg", min: 4.5, what: "texto principal sobre a página" },
  { fg: "fg", bg: "card", min: 4.5, what: "texto dentro de cards" },
  { fg: "muted", bg: "bg", min: 4.5, what: "texto secundário sobre a página" },
  { fg: "muted", bg: "card", min: 4.5, what: "texto secundário em cards" },
  { fg: "blue", bg: "bg", min: 4.5, what: "links sobre a página" },
  { fg: "blue", bg: "card", min: 4.5, what: "links dentro de cards" },
  { fg: "block-fg", bg: "block", min: 4.5, what: "texto sobre blocos sólidos" },
  { fg: "on-bright", bg: "acid", min: 4.5, what: "texto sobre ácido" },
  { fg: "on-bright", bg: "yellow", min: 4.5, what: "texto sobre amarelo" },
  { fg: "on-bright", bg: "pink", min: 4.5, what: "texto sobre rosa" },
  { fg: "fg", bg: "pros-bg", min: 4.5, what: "texto na caixa de prós" },
  { fg: "fg", bg: "cons-bg", min: 4.5, what: "texto na caixa de contras" },
  { fg: "muted-on-block", bg: "block", min: 4.5, what: "texto secundário em blocos de tinta" },
  { fg: "ph-fg", bg: "ph-bg-a", min: 4.5, what: "texto do placeholder de imagem" },
  { fg: "ph-fg", bg: "ph-bg-b", min: 4.5, what: "texto do placeholder (outro extremo do gradiente)" },
  { fg: "line", bg: "bg", min: 3, what: "bordas e sombras sobre a página" },
];

function contrastIssues() {
  const issues = [];
  ["light"].forEach((mode) => {
    const t = tokensFor();
    CONTRAST_PAIRS.forEach((p) => {
      if (!t[p.fg] || !t[p.bg]) {
        issues.push("contraste [" + mode + "]: token --" + (t[p.fg] ? p.bg : p.fg) + " não existe em style.css");
        return;
      }
      const r = contrast(t[p.fg], t[p.bg]);
      if (r < p.min) {
        issues.push(
          "contraste [" + mode + "] " + p.what + ": --" + p.fg + " (" + t[p.fg] + ") sobre --" + p.bg +
          " (" + t[p.bg] + ") = " + r.toFixed(2) + ":1, mínimo " + p.min + ":1"
        );
      }
    });
  });
  return issues;
}

/* ---------- Escrita ---------- */
function write(relPath, content) {
  const p = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
  return relPath;
}

/* ---------- Validação ---------- */
const { warnings, errors } = validate();

if (errors.length) {
  console.error('\n✖ Validação com erros — build cancelado:');
  errors.forEach((e) => console.error('  ✖ ' + e));
  process.exit(1);
}

const written = [];

// og:image placeholder (cor ácida da marca)
const ogPath = path.join(ROOT, "assets", "og", "og-default.png");
fs.mkdirSync(path.dirname(ogPath), { recursive: true });
fs.writeFileSync(ogPath, brandedPng());
written.push("assets/og/og-default.png");

// home + sobre
written.push(write("index.html", homePage("pt")));
written.push(write("en/index.html", homePage("en")));
written.push(write("sobre.html", sobrePage("pt")));
written.push(write("en/sobre.html", sobrePage("en")));

// artigos
articles.forEach((a) => {
  const folder = CATEGORY[a.category].folder;
  written.push(write(path.join(folder, a.slug + ".html"), articlePage(a, "pt")));
  written.push(write(path.join("en", folder, a.slug + ".html"), articlePage(a, "en")));
});

// listagens
written.push(write(path.join("reviews", "index.html"), listingPage("reviews", "pt")));
written.push(write(path.join("en", "reviews", "index.html"), listingPage("reviews", "en")));
written.push(write(path.join("guias", "index.html"), listingPage("guias", "pt")));
written.push(write(path.join("en", "guias", "index.html"), listingPage("guias", "en")));

// sitemap.xml + robots.txt (URLs absolutas a partir do siteUrl)
const sitemapEntries = [];
[
  { pt: "index.html", en: "en/index.html" },
  { pt: "sobre.html", en: "en/sobre.html" },
  { pt: "reviews/index.html", en: "en/reviews/index.html" },
  { pt: "guias/index.html", en: "en/guias/index.html" },
].forEach((p) => {
  sitemapEntries.push({ loc: p.pt, pt: p.pt, en: p.en, xdefault: p.pt, lastmod: null });
  sitemapEntries.push({ loc: p.en, pt: p.pt, en: p.en, xdefault: p.pt, lastmod: null });
});
articles.forEach((a) => {
  const folder = CATEGORY[a.category].folder;
  const pt = folder + "/" + a.slug + ".html";
  const en = "en/" + folder + "/" + a.slug + ".html";
  sitemapEntries.push({ loc: pt, pt: pt, en: en, xdefault: pt, lastmod: a.date });
  sitemapEntries.push({ loc: en, pt: pt, en: en, xdefault: pt, lastmod: a.date });
});
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  sitemapEntries
    .map(
      (u) =>
        "  <url>\n" +
        "    <loc>" + siteUrl + "/" + u.loc + "</loc>\n" +
        (u.lastmod ? "    <lastmod>" + u.lastmod + "</lastmod>\n" : "") +
        '    <xhtml:link rel="alternate" hreflang="pt-PT" href="' + siteUrl + "/" + u.pt + '"/>\n' +
        '    <xhtml:link rel="alternate" hreflang="en" href="' + siteUrl + "/" + u.en + '"/>\n' +
        '    <xhtml:link rel="alternate" hreflang="x-default" href="' + siteUrl + "/" + u.xdefault + '"/>\n' +
        "  </url>"
    )
    .join("\n") +
  "\n</urlset>\n";
written.push(write("sitemap.xml", sitemap));
written.push(write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: " + siteUrl + "/sitemap.xml\n"));

/* ---------- Fuga de português nas páginas EN ---------- */
/* O disclosure já esteve meio traduzido ("This article contains links de
   afiliados — vê a nossa policy") porque só o primeiro fragmento vinha do LANG.
   Esta guarda apanha a classe do bug, não só aquela frase. */
const PT_ONLY = ["links de afiliados", "vê a nossa", "Este artigo", "Este guia", "Ver reviews", "Ler o guia", "Início"];
const leaks = [];
written
  .map((f) => f.replace(/\\/g, "/"))
  .filter((f) => f.startsWith("en/"))
  .forEach((f) => {
    const html = fs.readFileSync(path.join(ROOT, f), "utf8");
    PT_ONLY.forEach((s) => {
      if (html.indexOf(s) !== -1) leaks.push(f + ' contém texto PT: "' + s + '"');
    });
  });

if (leaks.length) {
  console.error("\n✖ Português a fugir para as páginas EN — build cancelado:");
  leaks.forEach((l) => console.error("  ✖ " + l));
  process.exit(1);
}

console.log("✔ Build concluído — " + written.length + " ficheiros gerados");
console.log("  siteUrl: " + siteUrl);
console.log("  og:image: " + ogImage);
written.forEach((f) => console.log("  - " + f));

if (warnings.length) {
  console.log('\n⚠ ' + warnings.length + ' aviso(s):');
  warnings.forEach((w) => console.log('  ⚠ ' + w));
} else {
  console.log('\n✔ Validação: sem avisos.');
}
