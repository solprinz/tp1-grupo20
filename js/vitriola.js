/* ============================================================
   🎩 LA VITRIOLA — Reproductor de discos favoritos
   Modal con embed de YouTube o Spotify, accesible.
   ============================================================ */
(() => {
  "use strict";

  /* ---------- 1. BASE DE DATOS DE DISCOS ---------- */
  const DISCOS = {
    1: {
      cancion: "Shadow of the Day",
      artista: "Linkin Park",
      anio: 2007,
      portada: "../../img/daniela/minutes-to-midnight-lp.jpg",
      embed: {
        tipo: "spotify",
        url: "https://open.spotify.com/embed/track/0OYcEfskah1egYHjYRvbg1?utm_source=generator",
        titulo: "Shadow of the Day — Linkin Park",
      },
    },
    2: {
      cancion: "Dark Paradise",
      artista: "Lana Del Rey",
      anio: 2012,
      portada: "../../img/daniela/lana-rey.jpg",
      embed: {
        tipo: "spotify",
        url: "https://open.spotify.com/embed/track/6qqdFWe7C4LsBjWbXQdsHA?utm_source=generator",
        titulo: "Dark Paradise — Lana Del Rey",
      },
    },
    3: {
      cancion: "Play Date",
      artista: "Melanie Martinez",
      anio: 2015,
      portada: "../../img/daniela/melaniemartinez.jpg",
      embed: {
        tipo: "spotify",
        url: "https://open.spotify.com/embed/track/4GBcYFYVwnsPDo6OOauRir?utm_source=generator",
        titulo: "Play Date — Melanie Martinez",
      },
    },
  };

  /* ---------- 2. REFERENCIAS DOM ---------- */
  const modal = document.getElementById("vitriola");
  if (!modal) return;

  const overlay = modal.querySelector(".vitriola-overlay");
  const caja = modal.querySelector(".vitriola-caja");
  const btnCerrarX = modal.querySelector(".vitriola-cerrar");
  const btnCerrar = modal.querySelector(".vitriola-pie .vitriola-boton");
  const portada = modal.querySelector(".vitriola-portada");
  const contenedorEmbed = modal.querySelector(".vitriola-embed");
  const elCancion = modal.querySelector(".vitriola-cancion");
  const elArtista = modal.querySelector(".vitriola-artista");
  const elAnio = modal.querySelector(".vitriola-anio");

  const botonesPlay = document.querySelectorAll(".vitriola-play");

  let ultimoFoco = null;

  /* ---------- 3. CONSTRUIR EMBED ---------- */
  function crearEmbed(embed) {
    const iframe = document.createElement("iframe");

    if (embed.tipo === "youtube") {
      iframe.src = embed.url;
      iframe.width = "100%";
      iframe.height = "315";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
    } else if (embed.tipo === "spotify") {
      iframe.src = embed.url;
      iframe.width = "100%";
      iframe.height = "352";
      iframe.allow =
        "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      iframe.loading = "lazy";
    }

    iframe.title = embed.titulo || "Reproductor";
    iframe.setAttribute("frameborder", "0");
    return iframe;
  }

  /* ---------- 4. ABRIR MODAL ---------- */
  function abrirModal(idDisco, botonOrigen) {
    const disco = DISCOS[idDisco];
    if (!disco) return;

    ultimoFoco = botonOrigen;

    portada.src = disco.portada;
    portada.alt = `Portada de ${disco.cancion} — ${disco.artista}`;
    elCancion.textContent = disco.cancion;
    elArtista.textContent = disco.artista;
    elAnio.textContent = disco.anio;

    contenedorEmbed.innerHTML = "";
    contenedorEmbed.appendChild(crearEmbed(disco.embed));

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("vitriola-abierta");

    requestAnimationFrame(() => {
      btnCerrarX.focus();
    });
  }

  /* ---------- 5. CERRAR MODAL ---------- */
  function cerrarModal() {
    if (modal.hidden) return;

    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("vitriola-abierta");

    contenedorEmbed.innerHTML = "";

    if (ultimoFoco && typeof ultimoFoco.focus === "function") {
      ultimoFoco.focus();
    }
    ultimoFoco = null;
  }

  /* ---------- 6. EVENTOS ---------- */
  botonesPlay.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.disco;
      abrirModal(id, boton);
    });
  });

  btnCerrarX.addEventListener("click", cerrarModal);
  btnCerrar.addEventListener("click", cerrarModal);
  overlay.addEventListener("click", cerrarModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      e.preventDefault();
      cerrarModal();
    }
  });

  caja.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusables = caja.querySelectorAll(
      'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const primero = focusables[0];
    const ultimo = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  });
})();