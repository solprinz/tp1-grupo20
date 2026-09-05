document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inyección del cursor
    const cursorWrapper = document.createElement('div');
    cursorWrapper.id = 'cursor-wrapper';
    const cursorFalso = document.createElement('div');
    cursorFalso.id = 'cursor-falso';
    
    cursorWrapper.appendChild(cursorFalso);
    document.body.appendChild(cursorWrapper);

    let desarmado = false; 
    let cursorVisible = false;

    // EL ARREGLO: Declaramos posX y posY de forma global para todo el script
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
            // Ya no usamos "const" aquí, simplemente actualizamos las variables globales
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
    
    if (boton) {
        // EL ARREGLO 2: Le pasamos la (e) al evento de click
        boton.addEventListener('click', (e) => {
            if (desarmado) return; 
            desarmado = true;

            // EL ARREGLO 3: Aseguramos la posición exacta al momento del clic
            posX = e.clientX;
            posY = e.clientY;

            let contador = 0;
            const tirones = 15; 
            
            // Quitamos efectos de hover si los hubiera
            cursorFalso.classList.remove('hover-punta');

            const intervaloErratico = setInterval(() => {
                // Ahora las variables posX y posY existen y no crashean
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
                    desarmado = false;
                    cursorWrapper.classList.remove('caida');
                    cursorFalso.classList.remove('caida-rotacion'); 
                    
                    cursorWrapper.style.left = (posX - 45) + 'px';
                    cursorWrapper.style.top = posY + 'px';
                    
                    const pct = posX / window.innerWidth;
                    cursorFalso.style.transform = `rotate(${(pct - 1) * 90}deg) scale(1)`; 
                }, 3000);
            }
        });
    }
});