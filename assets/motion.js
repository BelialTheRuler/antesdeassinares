/* Movimento — ver a secção "Movimento" do style.css para a intenção.

   Este ficheiro só ACRESCENTA: nada aqui esconde conteúdo. Os cards já estão
   visíveis e na posição final; a classe `is-registered` toca uma animação que
   TERMINA no estado natural. Se o JS não correr, a página fica igual. */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    if (!reduced) {
      // Os cards registam à medida que entram, em cascata dentro da grelha.
      // Atraso limitado a 3 passos: uma grelha de 6 não deve levar meio segundo
      // a acabar de aparecer.
      var cards = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var i = Array.prototype.indexOf.call(el.parentElement.children, el);
            el.style.animationDelay = Math.min(i, 3) * 70 + "ms";
            el.classList.add("is-registered");
            cards.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      document.querySelectorAll(".card").forEach(function (c) { cards.observe(c); });
    }

    // A estrela do hero roda em loop. Fora do ecrã não há nada para ver, e um
    // loop que ninguém vê é bateria a arder — pausa quando sai da vista.
    var deco = document.querySelector(".hero-deco");
    if (deco) {
      new IntersectionObserver(function (entries) {
        deco.style.animationPlayState = entries[0].isIntersecting ? "running" : "paused";
      }).observe(deco);
    }
  });
})();
