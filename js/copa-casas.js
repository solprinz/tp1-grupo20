document.addEventListener("DOMContentLoaded", () => {
  const btnSuceso = document.getElementById("btn-suceso");
  const btnReiniciar = document.getElementById("btn-reiniciar");
  const mensajeEl = document.getElementById("mensaje-suceso");
  const cartelCampeon = document.getElementById("cartel-campeon");

  // Elementos de los marcadores de las 4 casas
  const puntosGryffindorEl = document.getElementById("puntos-gryffindor");
  const puntosSlytherinEl = document.getElementById("puntos-slytherin");
  const puntosRavenclawEl = document.getElementById("puntos-ravenclaw");
  const puntosHufflepuffEl = document.getElementById("puntos-hufflepuff");

  // 1. LEER PUNTOS GUARDADOS EN LOCALSTORAGE
  let puntosGryffindor =
    parseInt(localStorage.getItem("puntosGryffindor")) || 0;
  let puntosSlytherin = parseInt(localStorage.getItem("puntosSlytherin")) || 0;
  let puntosRavenclaw = parseInt(localStorage.getItem("puntosRavenclaw")) || 0;
  let puntosHufflepuff =
    parseInt(localStorage.getItem("puntosHufflepuff")) || 0;
  let indiceSuceso = parseInt(localStorage.getItem("indiceSuceso")) || 0;

  // Actualizar marcadores al iniciar
  puntosGryffindorEl.textContent = puntosGryffindor;
  puntosSlytherinEl.textContent = puntosSlytherin;
  puntosRavenclawEl.textContent = puntosRavenclaw;
  puntosHufflepuffEl.textContent = puntosHufflepuff;

  // 2. LISTA DE SUCESOS CON APORTES A OTRAS CASAS
  const sucesos = [
    {
      texto: "Harry Potter se cortó el cabello. ¡15 PUNTOS PARA GRYFFINDOR!",
      casa: "gryffindor",
      puntos: 15,
    },
    {
      texto:
        "Slytherin ganó el partido de Quidditch contra Ravenclaw. ¡5 PUNTOS PARA SLYTHERIN!",
      casa: "slytherin",
      puntos: 5,
    },

    {
      texto:
        "Ron encontró una moneda de 5 knuts en su túnica. ¡20 PUNTOS PARA GRYFFINDOR!",
      casa: "gryffindor",
      puntos: 20,
    },
    {
      texto:
        "Hufflepuff organizó un banquete de galletas para todo el castillo. ¡5 PUNTOS PARA HUFFLEPUFF!",
      casa: "hufflepuff",
      puntos: 5,
    },
    {
      texto:
        "Hermione levantó la mano en clase y esperó a que el profesor la autorizara a hablar. ¡10 PUNTOS PARA GRYFFINDOR!",
      casa: "gryffindor",
      puntos: 10,
    },
    {
      texto:
        "Neville recordó la contraseña de la Torre. ¡25 PUNTOS PARA GRYFFINDOR!",
      casa: "gryffindor",
      puntos: 25,
    },
    {
      texto:
        "Ravenclaw descubrió una nueva propiedad de la mandrágora. ¡5 PUNTOS PARA RAVENCLAW!",
      casa: "ravenclaw",
      puntos: 5,
    },
    {
      texto:
        "Harry respira el mismo aire que Dumbledore. ¡30 PUNTOS PARA GRYFFINDOR!",
      casa: "gryffindor",
      puntos: 30,
    },
  ];

  // Función para verificar si ya salió campeón
  const verificarCampeon = () => {
    if (puntosGryffindor >= 100) {
      cartelCampeon.classList.remove("d-none");
      if (btnSuceso) {
        btnSuceso.disabled = true;
        btnSuceso.classList.add("opacity-50");
      }
    }
  };

  // Comprobar estado al cargar la página
  if (puntosGryffindor >= 100) {
    verificarCampeon();
    mensajeEl.textContent =
      "¡La Copa ya ha sido otorgada a Gryffindor este año!";
  }

  // EVENTO: PRESIONAR "SUCESO DE LA SEMANA"
  if (btnSuceso) {
    btnSuceso.addEventListener("click", () => {
      if (puntosGryffindor >= 100) return;

      const sucesoActual = sucesos[indiceSuceso];
      let elementoAnimar = null;

      // Sumar puntos según la casa correspondiente
      if (sucesoActual.casa === "gryffindor") {
        puntosGryffindor += sucesoActual.puntos;
        puntosGryffindorEl.textContent = puntosGryffindor;
        localStorage.setItem("puntosGryffindor", puntosGryffindor);
        elementoAnimar = puntosGryffindorEl;
      } else if (sucesoActual.casa === "slytherin") {
        puntosSlytherin += sucesoActual.puntos;
        puntosSlytherinEl.textContent = puntosSlytherin;
        localStorage.setItem("puntosSlytherin", puntosSlytherin);
        elementoAnimar = puntosSlytherinEl;
      } else if (sucesoActual.casa === "ravenclaw") {
        puntosRavenclaw += sucesoActual.puntos;
        puntosRavenclawEl.textContent = puntosRavenclaw;
        localStorage.setItem("puntosRavenclaw", puntosRavenclaw);
        elementoAnimar = puntosRavenclawEl;
      } else if (sucesoActual.casa === "hufflepuff") {
        puntosHufflepuff += sucesoActual.puntos;
        puntosHufflepuffEl.textContent = puntosHufflepuff;
        localStorage.setItem("puntosHufflepuff", puntosHufflepuff);
        elementoAnimar = puntosHufflepuffEl;
      }

      // Mostrar el texto del suceso
      mensajeEl.textContent = sucesoActual.texto;

      // Animación en la casilla correspondiente
      if (elementoAnimar) {
        elementoAnimar.classList.remove("pop-anim");
        void elementoAnimar.offsetWidth;
        elementoAnimar.classList.add("pop-anim");
      }

      // Avanzar al siguiente suceso y guardar índice
      indiceSuceso = (indiceSuceso + 1) % sucesos.length;
      localStorage.setItem("indiceSuceso", indiceSuceso);

      // Verificar si Gryffindor llegó al objetivo
      verificarCampeon();
    });
  }

  // EVENTO: PRESIONAR "REINICIAR TORNEO"
  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () => {
      // Borrar registros de localStorage
      localStorage.removeItem("puntosGryffindor");
      localStorage.removeItem("puntosSlytherin");
      localStorage.removeItem("puntosRavenclaw");
      localStorage.removeItem("puntosHufflepuff");
      localStorage.removeItem("indiceSuceso");

      // Resetear variables
      puntosGryffindor = 0;
      puntosSlytherin = 0;
      puntosRavenclaw = 0;
      puntosHufflepuff = 0;
      indiceSuceso = 0;

      // Resetear interfaz
      puntosGryffindorEl.textContent = 0;
      puntosSlytherinEl.textContent = 0;
      puntosRavenclawEl.textContent = 0;
      puntosHufflepuffEl.textContent = 0;

      mensajeEl.textContent =
        "Presioná el botón para enterarte de las últimas novedades del castillo...";
      cartelCampeon.classList.add("d-none");

      if (btnSuceso) {
        btnSuceso.disabled = false;
        btnSuceso.classList.remove("opacity-50");
      }
    });
  }
});
