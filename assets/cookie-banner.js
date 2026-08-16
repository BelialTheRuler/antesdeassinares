/* Banner de consentimento de cookies (RGPD) — texto bilingue e escolha
   guardada por língua: consentir em PT não consente em EN (e vice-versa).
   A língua é lida de <html lang>, definida pelo i18n.js. */
(function () {
  "use strict";

  var TEXTS = {
    pt: {
      msg: "Este site usa apenas cookies técnicos (localStorage) para recordar as tuas preferências. Não carregamos rastreadores de terceiros sem o teu consentimento.",
      accept: "Aceitar",
      decline: "Recusar",
    },
    en: {
      msg: "This site only uses technical cookies (localStorage) to remember your preferences. We don't load third-party trackers without your consent.",
      accept: "Accept",
      decline: "Decline",
    },
  };

  function lang() {
    var l = (document.documentElement.lang || "pt").toLowerCase();
    return l.indexOf("pt") === 0 ? "pt" : "en";
  }

  function consentKey() {
    return "ferramentasia_consent_" + lang();
  }

  function show() {
    var b = document.getElementById("cookie-banner");
    if (!b) return;
    var t = TEXTS[lang()];

    var p = b.querySelector("p");
    if (p) p.textContent = t.msg;

    var accept = b.querySelector(".accept");
    var decline = b.querySelector(".decline");
    if (accept) accept.textContent = t.accept;
    if (decline) decline.textContent = t.decline;

    accept.addEventListener("click", function () {
      try { localStorage.setItem(consentKey(), "accepted"); } catch (e) {}
      b.classList.remove("show");
    });
    decline.addEventListener("click", function () {
      try { localStorage.setItem(consentKey(), "declined"); } catch (e) {}
      b.classList.remove("show");
    });

    b.classList.add("show");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var stored = null;
    try { stored = localStorage.getItem(consentKey()); } catch (e) {}
    if (!stored) show();
  });
})();
