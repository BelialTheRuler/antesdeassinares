/* ============================================================
   NEWSLETTER — liga o formulário da home (#newsletter-form)
   ------------------------------------------------------------
   Lê AFFILIATE_CONFIG.newsletter (em affiliate-config.js):
   - provider "mailerlite" → envia para o webform
   - provider "listmonk"   → envia para o formulário público (fase 1)
   - provider null         → guarda o lead em localStorage (backup)
   ============================================================ */
(function () {
  var form = document.getElementById("newsletter-form");
  if (!form || !window.AFFILIATE_CONFIG) return;
  var cfg = window.AFFILIATE_CONFIG.newsletter || {};
  var msg = form.querySelector(".newsletter-msg");
  var okText = form.getAttribute("data-ok") || "Recebido!";
  var errText = form.getAttribute("data-err") || "Email inválido.";

  function show(ok, text) {
    if (!msg) return;
    msg.textContent = text;
    msg.className = "newsletter-msg " + (ok ? "ok" : "err");
  }

  // Submissão nativa (sem CORS): cria um <form> real e submete.
  function nativeSubmit(action, pairs) {
    var f = document.createElement("form");
    f.method = "post";
    f.action = action;
    f.style.display = "none";
    Object.keys(pairs).forEach(function (name) {
      var h = document.createElement("input");
      h.type = "hidden";
      h.name = name;
      h.value = pairs[name];
      f.appendChild(h);
    });
    document.body.appendChild(f);
    f.submit();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = form.querySelector('input[type="email"]');
    var email = (input.value || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      show(false, errText);
      return;
    }

    if (cfg.provider === "mailerlite" && cfg.mailerlite && cfg.mailerlite.webformId) {
      var url = "https://api.mailerlite.com/webforms/submit/" + cfg.mailerlite.webformId;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: { email: email } }),
      })
        .then(function (r) {
          if (!r.ok) throw new Error(String(r.status));
          show(true, okText);
          form.reset();
        })
        .catch(function () {
          nativeSubmit(url, { "fields[email]": email });
        });
      return;
    }

    if (cfg.provider === "listmonk" && cfg.listmonk && cfg.listmonk.baseUrl) {
      var base = cfg.listmonk.baseUrl.replace(/\/+$/, "");
      var action = base + "/subscription/form" + (cfg.listmonk.token ? "/" + cfg.listmonk.token : "");
      fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "email=" + encodeURIComponent(email) + "&l=" + encodeURIComponent(cfg.listmonk.listId || ""),
      })
        .then(function (r) {
          if (!r.ok) throw new Error(String(r.status));
          show(true, okText);
          form.reset();
        })
        .catch(function () {
          nativeSubmit(action, { email: email, l: cfg.listmonk.listId || "" });
        });
      return;
    }

    // provider não configurado → backup local (importar quando ligares o MailerLite)
    try {
      var leads = JSON.parse(localStorage.getItem("antesdeassinares_leads") || "[]");
      if (leads.indexOf(email) === -1) {
        leads.push(email);
        localStorage.setItem("antesdeassinares_leads", JSON.stringify(leads));
      }
    } catch (_) {}
    show(true, okText);
    form.reset();
  });
})();
