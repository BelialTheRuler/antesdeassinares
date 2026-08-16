/* i18n — alimenta o botão de troca de língua (PT na raiz, EN em /en/).

   NÃO redireciona automaticamente pela língua do browser. Já o fez, e custava
   duas coisas: um português com o sistema em inglês nunca via a versão PT, e o
   Googlebot (que renderiza em en-US) era expulso de todos os URLs PT — que são
   os canónicos e o x-default, ou seja, exatamente os que o SEO PT-PT precisa de
   ter indexados. O par hreflang + botão visível é o mecanismo correto, e é o
   que a própria Google recomenda em vez do redirecionamento automático. */
(function () {
  "use strict";

  function rootPath() {
    var segs = location.pathname.split("/").filter(Boolean);
    segs.pop();
    return segs.length ? "../".repeat(segs.length) : "./";
  }

  function pageRelPath() {
    var segs = location.pathname.split("/").filter(Boolean);
    if (segs[0] === "en") segs.shift();
    return segs.join("/") || "index.html";
  }

  function currentLang() {
    var segs = location.pathname.split("/").filter(Boolean);
    return segs[0] === "en" ? "en" : "pt";
  }

  var current = currentLang();

  document.documentElement.lang = current === "pt" ? "pt-PT" : "en";

  document.addEventListener("DOMContentLoaded", function () {
    var sw = document.getElementById("lang-switch");
    if (!sw) return;
    var target = current === "pt" ? "en" : "pt";
    sw.textContent = target.toUpperCase();
    sw.setAttribute("aria-label", target === "en" ? "Versão em inglês" : "Portuguese version");
    sw.href = target === "en"
      ? rootPath() + "en/" + pageRelPath()
      : rootPath() + pageRelPath();
  });
})();
