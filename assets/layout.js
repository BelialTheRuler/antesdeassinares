/* Header/footer partilhados — injeta fontes, marquee, navegação e ferramentas (dark + língua).
   Funciona em PT (raiz) e EN (/en/): os caminhos relativos sobem sempre pelo mesmo número
   de segmentos, por isso os assets partilhados (/assets) resolvem corretamente. */
(function () {
  "use strict";

  function rootPath() {
    var segs = location.pathname.split("/").filter(Boolean);
    segs.pop(); // remove o nome do ficheiro
    return segs.length ? "../".repeat(segs.length) : "./";
  }

  function currentLang() {
    var l = document.documentElement.lang;
    if (l) return l.substring(0, 2);
    return (document.body.getAttribute("data-lang") || "pt").substring(0, 2);
  }

  function fonts() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
  }

  var TICKER = {
    pt: [
      "FERRAMENTAS DE IA TESTADAS EM PORTUGUÊS",
      "REVIEWS HONESTOS — SEM AFILIAÇÕES ESCONDIDAS",
      "COMISSÃO RECORRENTE ★ NÃO É SPAM",
      "PRÓS, CONTRAS E VEREDICTO EM CADA ARTIGO",
      "ATUALIZADO AGO 2026",
    ],
    en: [
      "AI TOOLS, ACTUALLY TESTED",
      "HONEST REVIEWS — NO HIDDEN AFFILIATIONS",
      "RECURRING COMMISSIONS ★ NOT SPAM",
      "PROS, CONS AND A CLEAR VERDICT",
      "UPDATED AUG 2026",
    ],
  };

  var NAV = {
    pt: [
      { key: "inicio", label: "Início" },
      { key: "reviews", label: "Reviews" },
      { key: "guias", label: "Guias" },
      { key: "sobre", label: "Sobre" },
    ],
    en: [
      { key: "inicio", label: "Home" },
      { key: "reviews", label: "Reviews" },
      { key: "guias", label: "Guides" },
      { key: "sobre", label: "About" },
    ],
  };

  var FOOTER = {
    pt: { tagline: "Reviews honestos de ferramentas de IA, testadas com conta paga.", about: "Sobre e disclosure" },
    en: { tagline: "Honest reviews of AI tools, tested on a paid account.", about: "About & disclosure" },
  };

  // Faixa de afirmações. Já foi um marquee em loop infinito, com os items
  // duplicados e aria-hidden: metade do texto estava sempre fora do ecrã e um
  // leitor de ecrã nunca o anunciava. Eram as afirmações que dão a cara pelo
  // site, e ninguém as lia inteiras. Agora está parada, e é conteúdo a sério.
  function ticker(lang) {
    var items = TICKER[lang] || TICKER.pt;
    return (
      '<div class="ticker">' +
      items.map(function (t) { return "<span>" + t + "</span>"; }).join("") +
      "</div>"
    );
  }

  function nav(lang) {
    var page = document.body.getAttribute("data-page") || "";
    var items = NAV[lang] || NAV.pt;
    var root = rootPath();
    var links = {
      inicio: root + "index.html",
      reviews: root + "reviews/index.html",
      guias: root + "guias/index.html",
      sobre: root + "sobre.html",
    };
    return items
      .map(function (it) {
        return '<a href="' + links[it.key] + '"' + (page === it.key ? ' class="active"' : "") + ">" + it.label + "</a>";
      })
      .join("");
  }

  function header(lang) {
    return (
      ticker(lang) +
      '<header class="site-header"><div class="inner">' +
      '<a class="brand" href="' + rootPath() + 'index.html">Antes de <span>Assinares</span></a>' +
      '<div class="header-right">' +
      '<nav class="site-nav">' + nav(lang) + "</nav>" +
      '<div class="header-tools">' +
      '<a id="lang-switch" class="tool-btn" href="#">EN</a>' +
      "</div>" +
      "</div>" +
      "</div></header>"
    );
  }

  function footer(lang) {
    var f = FOOTER[lang] || FOOTER.pt;
    return (
      '<footer class="site-footer"><div class="inner">' +
      "<div><strong>Antes de <span>Assinares</span></strong><br>" + f.tagline + "</div>" +
      '<div><a href="' + rootPath() + 'sobre.html">' + f.about + "</a><br>" +
      '<span id="footer-email"></span></div>' +
      "</div></footer>"
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    fonts();
    var lang = currentLang();
    var cfg = window.AFFILIATE_CONFIG || {};
    document.querySelectorAll("[data-header]").forEach(function (el) {
      el.outerHTML = header(lang);
    });
    document.querySelectorAll("[data-footer]").forEach(function (el) {
      el.outerHTML = footer(lang);
    });
    if (cfg.contactEmail) {
      var em = document.getElementById("footer-email");
      if (em) em.textContent = cfg.contactEmail;
    }
  });
})();
