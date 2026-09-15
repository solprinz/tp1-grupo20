document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inyección del cursor
    const cursorWrapper = document.createElement('div');
    cursorWrapper.id = 'cursor-wrapper';
    const cursorFalso = document.createElement('div');
    cursorFalso.id = 'cursor-falso';
    
    cursorWrapper.appendChild(cursorFalso);
    document.body.appendChild(cursorWrapper);

    let desarmado = false; 
    let botonAnimado = false;
    let cursorVisible = false;

    // Posición global de la varita (para todo el script)
    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;

    // 3. Seguimiento y rotación
    document.addEventListener('mousemove', (e) => {
        // Hacemos visible la varita al primer movimiento
        if (!cursorVisible) {
            cursorWrapper.style.opacity = '1';
            cursorVisible = true;
        }

        if (!desarmado) {
            posX = e.clientX;
            posY = e.clientY;
            
            cursorWrapper.style.left = (posX - 45) + 'px';
            cursorWrapper.style.top = posY + 'px';

            const pct = posX / window.innerWidth; 
            const angulo = (pct - 1) * 90; 
            
            cursorFalso.style.transform = `rotate(${angulo}deg)`;
        }
    });

    // Lógica opcional de Hover
    document.addEventListener('mouseover', (e) => {
        // Evitamos que brille si la varita está tirada en el suelo (!desarmado)
        if (!desarmado && e.target.closest('a, button, input')) cursorFalso.classList.add('hover-punta');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, input')) cursorFalso.classList.remove('hover-punta');
    });

    // 4. Lógica del Hechizo Expelliarmus
    const boton = document.getElementById('btn-hechizo');
    const textoDuelo = document.getElementById('texto-duelo');
    const resultadoH2 = document.querySelector('#resultado-duelo .text-always-respuesta');
    const frasesVictoria = [
        '¡Venciste!',
        '¡Sos grande!',
        '¡Qué poder!',
        '¡Qué velocidad!',
        '¡Gran foco!'
    ];
    
    if (boton) {
        // 50% pierde el usuario (se desarma la varita del cursor),
        // 50% gana (el botón mismo sale volando, cae y se desvanece)
        boton.addEventListener('click', (e) => {
            if (desarmado || botonAnimado) return; 

            const usuarioGana = Math.random() < 0.5;

            if (usuarioGana) {
                botonQueVuela(e, boton);
            } else {
                desarmarVarita(e);
            }
        });
    }

    // ---- Caso "perdés": la varita del cursor se desarma ----
    function desarmarVarita(e) {
        desarmado = true;

        // El duelo se pierde apenas se activa el hechizo
        if (textoDuelo) textoDuelo.textContent = 'Perdiste tu varita';
        if (resultadoH2) resultadoH2.classList.remove('activo');

        // Aseguramos la posición exacta al momento del clic
        posX = e.clientX;
        posY = e.clientY;

        let contador = 0;
        const tirones = 15; 
        
        // Quitamos efectos de hover si los hubiera
        cursorFalso.classList.remove('hover-punta');

        const intervaloErratico = setInterval(() => {
            const xAleatorio = (posX - 45) + (Math.random() - 0.5) * 400; 
            const yAleatorio = posY + (Math.random() - 0.5) * 400;
            const rotacionAleatoria = (Math.random() - 0.5) * 720; 

            cursorWrapper.style.left = xAleatorio + 'px';
            cursorWrapper.style.top = yAleatorio + 'px';
            cursorFalso.style.transform = `rotate(${rotacionAleatoria}deg) scale(1.5)`;

            contador++;

            if (contador >= tirones) {
                clearInterval(intervaloErratico);
                caerAlSuelo();
            }
        }, 60); 

        function caerAlSuelo() {
            cursorWrapper.classList.add('caida'); 
            cursorFalso.classList.add('caida-rotacion'); 
            
            const piso = window.innerHeight - 45; 
            const xFinal = (posX - 45) + (Math.random() - 0.5) * 300; 

            setTimeout(() => {
                cursorWrapper.style.top = piso + 'px';
                cursorWrapper.style.left = xFinal + 'px';
                cursorFalso.style.transform = 'rotate(1080deg) scale(1)'; 
            }, 50);
            
            setTimeout(() => {
                // Duelo perdido: la varita queda tirada, vuelve el cursor
                // normal y el botón Expelliarmus deja de responder.
                // (Solo se dispara en esta página: ahí existe #btn-hechizo)
                document.body.classList.add('duelo-perdido');
                if (boton) boton.disabled = true;
            }, 1000);
        }
    }

    // ---- Caso "ganás": el botón mismo repite la coreografía de la varita ----
    function botonQueVuela(e, boton) {
        botonAnimado = true;

        // Mensaje de victoria aleatorio, como en Sol.html
        if (frasesVictoria.length && resultadoH2) {
            const frase = frasesVictoria[Math.floor(Math.random() * frasesVictoria.length)];
            resultadoH2.textContent = frase;
            resultadoH2.classList.add('activo');
        }

        const rect = boton.getBoundingClientRect();

        // Congelamos el alto real del contenedor: así el espacio que deja
        // el botón al volar no se pierde y el mensaje de victoria se lee
        // exactamente debajo de donde estaba el botón.
        const contenedor = boton.parentElement;
        const alturaOriginal = contenedor.offsetHeight;
        contenedor.style.height = alturaOriginal + 'px';

        // Lo sacamos del flujo para poder animarlo por la pantalla
        boton.style.position = 'fixed';
        boton.style.left = rect.left + 'px';
        boton.style.top = rect.top + 'px';
        boton.style.width = rect.width + 'px';
        boton.style.zIndex = '9999';
        boton.style.margin = '0';
        boton.style.transition = 'none';
        boton.style.pointerEvents = 'none';

        let contador = 0;
        const tirones = 15;

        const intervaloErratico = setInterval(() => {
            const xAleatorio = (e.clientX - rect.width / 2) + (Math.random() - 0.5) * 400;
            const yAleatorio = (e.clientY - rect.height / 2) + (Math.random() - 0.5) * 400;
            const rotacionAleatoria = (Math.random() - 0.5) * 720;

            boton.style.left = xAleatorio + 'px';
            boton.style.top = yAleatorio + 'px';
            boton.style.transform = `rotate(${rotacionAleatoria}deg) scale(1.5)`;

            contador++;

            if (contador >= tirones) {
                clearInterval(intervaloErratico);
                caerAlSuelo();
            }
        }, 60); 

        function caerAlSuelo() {
            const piso = window.innerHeight - rect.height;
            const xFinal = (e.clientX - rect.width / 2) + (Math.random() - 0.5) * 300;

            setTimeout(() => {
                boton.style.top = piso + 'px';
                boton.style.left = xFinal + 'px';
                boton.style.transform = 'rotate(1080deg) scale(1)';
                boton.style.transition = 'all 0.35s ease';
            }, 50);

            setTimeout(() => {
                // Ya en el suelo, se va desvaneciendo
                boton.style.opacity = '0';
                boton.style.transition = 'opacity 1.2s ease';
            }, 500);

            setTimeout(() => {
                // Vuelve completo a su lugar en el flujo
                boton.style.position = '';
                boton.style.left = '';
                boton.style.top = '';
                boton.style.width = '';
                boton.style.zIndex = '';
                boton.style.margin = '';
                boton.style.transform = '';
                boton.style.transition = '';
                boton.style.opacity = '';
                boton.style.pointerEvents = '';
                botonAnimado = false;
                contenedor.style.height = '';
                if (resultadoH2) resultadoH2.classList.remove('activo');
            }, 3500);
        }
    }
});