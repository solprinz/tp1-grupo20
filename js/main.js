//animación Sol
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-patronum");
  const contenedorPatronus = document.getElementById("patronus-display");

  boton.addEventListener("click", () => {
    contenedorPatronus.classList.toggle("activo");

    if (contenedorPatronus.classList.contains("activo")) {
      boton.textContent = "¡Hechizo invocado!";
    } else {
      boton.textContent = "¡Expecto Patronum!";
    }
  });
});
