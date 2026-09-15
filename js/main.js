//animación Sol
document.addEventListener("DOMContentLoaded", () => {
  const btnRevelio = document.getElementById("btn-revelio-always");
  const escena = document.getElementById("escena-always");

  if (btnRevelio && escena) {
    btnRevelio.addEventListener("click", () => {
      btnRevelio.classList.add("oculto");

      escena.classList.add("activo");
    });
  }
});
