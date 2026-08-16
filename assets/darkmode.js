/* Dark mode — default: CLARO. Só muda se o utilizador escolher explicitamente
   (preferência guardada). Aplica a classe .dark em <html> antes do primeiro render. */
(function () {
  "use strict";

  var KEY = "antesdeassinares_theme";
  var ICONS = { dark: "☀", light: "☾" };

  // O botão é só um ícone, por isso o aria-label é o único nome que o leitor de
  // ecrã anuncia — tem de estar na língua da página, não sempre em português.
  var LABELS = {
    pt: { dark: "Ativar modo claro", light: "Ativar modo escuro" },
    en: { dark: "Switch to light mode", light: "Switch to dark mode" },
  };

  function labels() {
    return (document.documentElement.lang || "pt").indexOf("en") === 0 ? LABELS.en : LABELS.pt;
  }

  function apply(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    var btn = document.getElementById("dark-toggle");
    if (btn) {
      btn.textContent = ICONS[theme] || ICONS.light;
      btn.setAttribute("aria-label", labels()[theme] || labels().light);
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  var theme = saved || "light"; // default claro — nunca depende do tema do sistema
  apply(theme);

  document.addEventListener("DOMContentLoaded", function () {
    // Sincroniza o ícone do botão (o layout é injetado depois do script correr).
    apply(theme);
    var btn = document.getElementById("dark-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
      try { localStorage.setItem(KEY, theme); } catch (e) {}
      apply(theme);
    });
  });
})();
