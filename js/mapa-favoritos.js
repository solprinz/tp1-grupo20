(() => {
  "use strict";
  document.querySelectorAll(".perfil-alejandro .mapa-favoritos").forEach((mapa) => {
    const abrir = mapa.querySelector("[data-abrir-mapa]");
    const cerrar = mapa.querySelector("[data-cerrar-mapa]");
    const estado = mapa.querySelector(".mapa-estado");
    const invitacion = mapa.querySelector(".mapa-invitacion");
    const lugares = [...mapa.querySelectorAll("[data-lugar]")];
    let activo = null;

    function cerrarFicha(devolverFoco = false) {
      if (!activo) return;
      const boton = activo.querySelector("[data-visitar]");
      mapa.querySelector("#" + boton.getAttribute("aria-controls")).hidden = true;
      boton.setAttribute("aria-expanded", "false");
      activo.classList.remove("mapa-seleccionado");
      activo = null;
      invitacion.hidden = false;
      if (devolverFoco) boton.focus();
    }

    function abrirMapa() {
      mapa.classList.add("mapa-abierto");
      abrir.setAttribute("aria-expanded", "true");
      estado.textContent = "Caminos revelados. Elegí un favorito para explorar.";
    }

    lugares.forEach((lugar) => {
      const boton = lugar.querySelector("[data-visitar]");
      const ficha = mapa.querySelector("#" + boton.getAttribute("aria-controls"));
      const cerrarBoton = ficha.querySelector("[data-cerrar-ficha]");
      ficha.hidden = true;
      boton.hidden = false;
      cerrarBoton.hidden = false;
      boton.setAttribute("aria-expanded", "false");
      boton.addEventListener("click", () => {
        if (activo === lugar) {
          cerrarFicha(true);
          estado.textContent = "Ficha cerrada. Podés seguir explorando.";
          return;
        }
        cerrarFicha();
        abrirMapa();
        activo = lugar;
        lugar.classList.add("mapa-seleccionado");
        boton.setAttribute("aria-expanded", "true");
        invitacion.hidden = true;
        ficha.hidden = false;
        estado.textContent = "Explorando: " + ficha.querySelector("h3").textContent + ".";
        ficha.querySelector("h3").focus();
      });
      cerrarBoton.addEventListener("click", () => {
        cerrarFicha(true);
        estado.textContent = "Ficha cerrada. Podés seguir explorando.";
      });
    });

    [abrir, cerrar, estado, invitacion].forEach((elemento) => { elemento.hidden = false; });
    abrir.addEventListener("click", abrirMapa);
    cerrar.addEventListener("click", () => {
      cerrarFicha();
      mapa.classList.remove("mapa-abierto");
      abrir.setAttribute("aria-expanded", "false");
      estado.textContent = "Travesura realizada. Los favoritos siguen en el mapa.";
      abrir.focus();
    });
    mapa.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && activo) {
        evento.preventDefault();
        cerrarFicha(true);
        estado.textContent = "Ficha cerrada.";
      }
    });
  });
})();
