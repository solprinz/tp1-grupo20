(() => {
  "use strict";

  const seccion = document.querySelector(".perfil-alejandro #proyectos.reliquias");
  if (!seccion) return;

  const tarjetas = [...seccion.querySelectorAll("[data-reliquia]")];
  const historias = [...seccion.querySelectorAll("[data-historia]")];
  const progreso = seccion.querySelector(".reliquias-progreso");
  const final = seccion.querySelector(".reliquias-final");
  const visitadas = new Set();
  let activa = null;

  function cerrar(devolverFoco = true) {
    if (!activa) return;
    const boton = activa.querySelector("[aria-controls]");
    seccion.querySelector("#" + boton.getAttribute("aria-controls")).hidden = true;
    boton.setAttribute("aria-expanded", "false");
    boton.textContent = "Revelar historia";
    activa.classList.remove("reliquia-activa");
    activa = null;
    if (devolverFoco) boton.focus();
  }

  tarjetas.forEach((tarjeta) => {
    const boton = tarjeta.querySelector("[aria-controls]");
    const historia = historias.find((item) => item.id === boton.getAttribute("aria-controls"));
    historia.hidden = true;
    boton.hidden = false;
    boton.setAttribute("aria-expanded", "false");
    historia.querySelector("[data-cerrar]").hidden = false;

    boton.addEventListener("click", () => {
      if (activa === tarjeta) {
        cerrar();
        return;
      }
      cerrar(false);
      activa = tarjeta;
      tarjeta.classList.add("reliquia-activa");
      tarjeta.dataset.explorada = "true";
      historia.hidden = false;
      boton.setAttribute("aria-expanded", "true");
      boton.textContent = "Cerrar historia";
      visitadas.add(tarjeta.dataset.reliquia);
      const completa = visitadas.size === tarjetas.length;
      final.hidden = !completa;
      progreso.textContent = visitadas.size + " de " + tarjetas.length +
        " historias exploradas." + (completa ? " La verdadera magia está en lo que creamos." : "");
      historia.querySelector("h3").focus();
    });
    historia.querySelector("[data-cerrar]").addEventListener("click", () => cerrar());
  });

  progreso.hidden = false;
  seccion.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && activa) {
      evento.preventDefault();
      cerrar();
    }
  });
})();
