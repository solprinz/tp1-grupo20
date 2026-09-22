document.addEventListener("DOMContentLoaded", () => {
  const btnModo = document.getElementById("btn-modo-oscuro");
  const textoModo = document.getElementById("texto-modo");

  const modoGuardado = localStorage.getItem("modoNox");

  if (modoGuardado === "activado") {
    document.body.classList.add("modo-nox");
    if (textoModo) textoModo.textContent = "Lumos";
  }

  if (btnModo) {
    btnModo.addEventListener("click", () => {
      document.body.classList.toggle("modo-nox");

      const esNox = document.body.classList.contains("modo-nox");

      if (esNox) {
        if (textoModo) textoModo.textContent = "Lumos";
        localStorage.setItem("modoNox", "activado");
      } else {
        if (textoModo) textoModo.textContent = "Nox";
        localStorage.setItem("modoNox", "desactivado");
      }
    });
  }
});
