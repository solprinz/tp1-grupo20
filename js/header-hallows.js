(() => {
  "use strict";
  const header = document.querySelector(".header-hallows");
  if (!header) return;

  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  let anterior = Math.max(0, window.scrollY);
  let desplazamiento = 0;
  let pendiente = false;

  function actualizar() {
    pendiente = false;
    const posicion = Math.max(0, window.scrollY);
    const altura = header.offsetHeight || 1;
    const focoTeclado = header.contains(document.activeElement) &&
      document.activeElement.matches(":focus-visible");
    const menuAbierto = header.querySelector(".navbar-collapse.show, .navbar-collapse.collapsing");

    if (posicion <= 16 || focoTeclado || menuAbierto || movimientoReducido.matches) {
      desplazamiento = 0;
    } else {
      desplazamiento = Math.min(altura, Math.max(0, desplazamiento + posicion - anterior));
    }
    anterior = posicion;
    header.style.setProperty("--header-desplazamiento", -desplazamiento + "px");
    header.style.setProperty("--header-opacidad", String(1 - desplazamiento / altura));
  }

  function programar() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(actualizar);
  }

  window.addEventListener("scroll", programar, { passive: true });
  window.addEventListener("resize", programar);
  movimientoReducido.addEventListener("change", programar);
  header.addEventListener("focusin", () => {
    desplazamiento = 0;
    actualizar();
  });
  header.addEventListener("shown.bs.collapse", actualizar);
  header.addEventListener("hidden.bs.collapse", actualizar);
  actualizar();
})();
