/* ============================================================
   🎩 QUIZ: ¿Qué casa de Hogwarts sos?
   Lógica del Sombrero Seleccionador
   ============================================================ */
(() => {
  "use strict";

  /* ---------- 1. CONFIGURACIÓN ---------- */
  const TOTAL_PREGUNTAS = 3;

  const RESULTADOS = {
    gryffindor: {
      nombre: "¡GRYFFINDOR!",
      frase: "Donde habitan los valientes de corazón.",
    },
    slytherin: {
      nombre: "¡SLYTHERIN!",
      frase: "Donde la ambición y la astucia reinan.",
    },
    ravenclaw: {
      nombre: "¡RAVENCLAW!",
      frase: "Donde la sabiduría abre todas las puertas.",
    },
    hufflepuff: {
      nombre: "¡HUFFLEPUFF!",
      frase: "Donde la lealtad es la mayor virtud.",
    },
  };

  /* ---------- 2. REFERENCIAS DOM ---------- */
  const quiz = document.getElementById("quiz");
  if (!quiz) return;

  const contenedor = quiz.querySelector(".quiz-contenedor");
  const preguntas = quiz.querySelectorAll(".quiz-pregunta-actual");
  const resultado = quiz.querySelector(".quiz-resultado");
  const elCasaResultado = quiz.querySelector(".quiz-casa-resultado");
  const elFraseResultado = quiz.querySelector(".quiz-frase-resultado");
  const btnReiniciar = quiz.querySelector(".quiz-reiniciar");

  /* ---------- 3. ESTADO DEL QUIZ ---------- */
  let preguntaActual = 0;
  let puntajes = {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0,
  };

  /* ---------- 4. FUNCIONES ---------- */
  function mostrarPregunta(indice) {
    // Ocultar todas las preguntas
    preguntas.forEach((p) => {
      p.hidden = true;
    });

    // Mostrar la pregunta actual
    if (preguntas[indice]) {
      preguntas[indice].hidden = false;

      // Enfocar el título de la pregunta (accesibilidad sin "pegar" color)
      const tituloPregunta = preguntas[indice].querySelector(".quiz-pregunta");
      if (tituloPregunta) {
        tituloPregunta.setAttribute("tabindex", "-1");
        requestAnimationFrame(() => tituloPregunta.focus());
      }
    }
  }

  function sumarPunto(casa) {
    if (puntajes[casa] !== undefined) {
      puntajes[casa]++;
    }
  }

  function calcularGanadora() {
    let ganadora = "gryffindor";
    let maxPuntos = -1;

    for (const casa in puntajes) {
      if (puntajes[casa] > maxPuntos) {
        maxPuntos = puntajes[casa];
        ganadora = casa;
      }
    }

    return ganadora;
  }

  function mostrarResultado() {
    // Ocultar todas las preguntas
    preguntas.forEach((p) => {
      p.hidden = true;
    });

    // Calcular casa ganadora
    const casaGanadora = calcularGanadora();
    const datos = RESULTADOS[casaGanadora];

    // Cargar datos en el resultado
    elCasaResultado.textContent = datos.nombre;
    elCasaResultado.setAttribute("data-casa", casaGanadora);
    elFraseResultado.textContent = datos.frase;

    // Mostrar resultado
    resultado.hidden = false;

    // Enfocar el título del resultado (accesibilidad sin "pegar" color)
    requestAnimationFrame(() => {
      elCasaResultado.setAttribute("tabindex", "-1");
      elCasaResultado.focus();
    });
  }

  function reiniciarQuiz() {
    // Reiniciar estado
    preguntaActual = 0;
    puntajes = {
      gryffindor: 0,
      slytherin: 0,
      ravenclaw: 0,
      hufflepuff: 0,
    };

    // Ocultar resultado
    resultado.hidden = true;

    // Mostrar primera pregunta
    mostrarPregunta(0);
  }

  /* ---------- 5. EVENTOS ---------- */
  // Click en cualquier botón de opción
  quiz.querySelectorAll(".quiz-boton[data-casa]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const casa = boton.dataset.casa;
      sumarPunto(casa);

      // Avanzar a la siguiente pregunta o mostrar resultado
      if (preguntaActual < TOTAL_PREGUNTAS - 1) {
        preguntaActual++;
        mostrarPregunta(preguntaActual);
      } else {
        mostrarResultado();
      }
    });
  });

  // Click en "Jugar de nuevo"
  btnReiniciar.addEventListener("click", reiniciarQuiz);

  /* ---------- 6. INICIALIZACIÓN ---------- */
  // Asegurarse de que la primera pregunta esté visible al cargar
  mostrarPregunta(0);
})();