document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-efficiency");
  const resultado = document.getElementById("resultado-efficiency");

  let esperando = false;
  let inicio = 0;

  btn.addEventListener("click", () => {

    // ✨ Destello mágico en el botón
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    crearDestello(x, y);

    // Si NO estamos esperando → iniciar prueba
    if (!esperando) {
      resultado.textContent = "";
      btn.textContent = "Esperá...";
      btn.style.backgroundColor = "#444";
      btn.style.cursor = "not-allowed";

      const delay = Math.random() * 3000 + 1000;

      setTimeout(() => {
        esperando = true;
        inicio = performance.now();
        btn.textContent = "¡Ahora!";
        btn.style.backgroundColor = "var(--slytherin1)";
        btn.style.cursor = "pointer";
      }, delay);

      return;
    }

    // Si estamos esperando → medir reacción
    const fin = performance.now();
    const tiempo = fin - inicio;

    let mensaje = "";

    if (tiempo < 250) {
      mensaje = "Reflejos de basilisco. Eficiencia suprema.";
    } else if (tiempo < 450) {
      mensaje = "Rápido como una serpiente en las mazmorras.";
    } else if (tiempo < 700) {
      mensaje = "Buena reacción, digno de Slytherin.";
    } else {
      mensaje = "Necesitás más práctica… la eficiencia requiere precisión.";
    }

    resultado.textContent = `${mensaje} (${Math.round(tiempo)} ms)`;

    // ✔ Serpiente debajo del resultado
    activarSerpienteDesdeTrigger();

    // Reset visual
    btn.textContent = "Iniciar prueba";
    btn.style.backgroundColor = "";
    btn.style.cursor = "";
    esperando = false;
  });
});


// ✨ DESTELLO MÁGICO
function crearDestello(x, y) {
  const destello = document.createElement("div");
  destello.classList.add("destello");

  destello.style.left = `${x - 10}px`;
  destello.style.top = `${y - 10}px`;

  document.body.appendChild(destello);

  setTimeout(() => destello.remove(), 500);
}


// 🐍 SERPIENTE DEBAJO DEL RESULTADO
function activarSerpienteDesdeTrigger() {
  const ancla = document.getElementById("ancla-serpiente");
  if (!ancla) return;

  // Limpiar serpientes previas si las hubiera
  ancla.innerHTML = "";

  const serpiente = document.createElement("div");
  serpiente.classList.add("serpiente-absoluta");

  // Imagen temática oficial de la serpiente de Slytherin del proyecto
  serpiente.innerHTML = `
    <img src="../../img/quiz/serpiente.png" alt="Serpiente de Slytherin" />
  `;

  ancla.appendChild(serpiente);

  // Se remueve automáticamente al terminar la animación CSS
  serpiente.addEventListener("animationend", () => {
    serpiente.remove();
  }, { once: true });
}