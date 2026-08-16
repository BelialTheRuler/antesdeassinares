/* Converte qualquer <a data-aff="chave"> no link de afiliado real,
   a partir da config central (affiliate-config.js). */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var cfg = (window.AFFILIATE_CONFIG || {}).programs || {};
    document.querySelectorAll("a[data-aff]").forEach(function (a) {
      var key = a.getAttribute("data-aff");
      var p = cfg[key];
      if (p && p.url) {
        a.href = p.url;
      } else {
        a.href = "#";
        a.setAttribute("title", "Link de afiliado pendente — preencher em affiliate-config.js");
      }
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "sponsored noopener nofollow");
    });
  });
})();
