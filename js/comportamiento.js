
document.addEventListener("DOMContentLoaded", function() {
    function cargaPalabra(){
        let palabra
        const req = new XMLHttpRequest()
        req.open('GET','https://random-word-api.herokuapp.com/word?lang=es&length=5',false);
        req.send()
        palabra = JSON.parse(req.responseText)
        console.log(palabra[0].toLowerCase())
        return palabra[0].toLowerCase()
    }    
    //https://rae-api.com/api/random?max_length=5&min_length=5
    function validarPalabra(palabra) {
        const req = new XMLHttpRequest();
        req.open(
            "GET",
            `https://es.wiktionary.org/w/api.php?action=query&titles=${palabra}&format=json&origin=*`,
            false
        );
        req.send();
        try {
            const data = JSON.parse(req.responseText);
            if (!data.query || !data.query.pages) return false;
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            console.log(Object.keys(pages)[0])
            return pageId !== "-1";
        } catch (e) {
            return false;
        }
    }

    let palabra = cargaPalabra();
    while (!validarPalabra(palabra)){
        palabra = cargaPalabra();
    }
    let letras = palabra.split("")
    palabra = ""
    for (let letra of letras){
        if (letra == "á") {
            letra = "a"
        }else if (letra == "é"){
            letra = "e"
        }else if (letra == "í"){
            letra = "i"
        }else if (letra == 'ó'){
            letra = "o"
        }else if (letra == "ú"){
            letra = "u"
        }
        palabra += letra
    }
    console.log("Palabra a adivinar: ",palabra)


    let filaActual = 0;
    let columnaActual = 0;

    const filas = 6;
    const columnas = 5;
    const titulo = document.getElementById("titulo");
    titulo.innerHTML = "Wordle";
    
    const tablero = document.getElementById("tablero");

    // crear celdas
    for (let i = 0; i < filas * columnas; i++) {
        const celda = document.createElement("div");
        celda.classList.add("celda");
        tablero.appendChild(celda);
    }

    const teclado = document.getElementById("teclado");
    const teclas = "QWERTYUIOPASDFGHJKLZXCVBNM";

    teclas.split("").forEach(letra => {
        const tecla = document.createElement("div");
        tecla.classList.add("tecla");
        tecla.textContent = letra;
        tecla.onclick = () => pressKey(letra);
        teclado.appendChild(tecla);
    });

    function pressKey(letra) {
        if (columnaActual < columnas && filaActual < filas) {
            const celdas = document.querySelectorAll(".celda");
            const index = filaActual * columnas + columnaActual;
            celdas[index].textContent = letra;
            columnaActual++;
        }
    }

    function backspace() {
        if (columnaActual > 0) {
            columnaActual--;
            const celdas = document.querySelectorAll(".celda");
            const index = filaActual * columnas + columnaActual;
            celdas[index].textContent = "";
        }
    }

    function checkWord() {
        if (columnaActual < columnas) return;

        const celdas = document.querySelectorAll(".celda");
        let intento = "";

        for (let i = 0; i < columnas; i++) {
            intento += celdas[filaActual * columnas + i]
                .textContent
                .toLowerCase();
        }

        intento = intento.trim();
       // VALIDAR SI LA PALABRA EXISTE
        if (!validarPalabra(intento)) {
            mostrarError("La palabra no existe. Intenta otra.");
            // Limpiar fila actual
            for (let i = 0; i < columnas; i++) {
                celdas[filaActual * columnas + i].textContent = "";
            }
            columnaActual = 0;
            return; // no avanzar fila
        }

        //Aqui se le pone un color a cada celda dependiendo de si la palabra esta bien, esta dentro de la palabra o no esta.
        for (let i = 0; i < columnas; i++) {
            const celda = celdas[filaActual * columnas + i];
            const letra = intento[i];

            if (letra === palabra[i]) {
                celda.classList.add("correcto");
            } else if (palabra.includes(letra)) {
                celda.classList.add("existe");
            } else {
                celda.classList.add("incorrecto");
            }
        }

        // COMPROBAR SI SE HA ADIVINADO
        if (intento === palabra) {
            mostrarMensaje("¡Has adivinado la palabra!");
            return; // detener avance de filas
        }

        filaActual++;
        columnaActual = 0;

        // Si se acaban los intentos
        if (filaActual >= filas) {
            mostrarMensaje(`¡Se han acabado los intentos! La palabra era: ${palabra}`);
        }
    }

function mostrarError(texto) {
    const mensaje = document.createElement("div");
    mensaje.textContent = texto;
    mensaje.style.position = "fixed";
    mensaje.style.bottom = "20px";           
    mensaje.style.left = "50%";
    mensaje.style.transform = "translateX(-50%)";
    mensaje.style.backgroundColor = "rgba(255, 0, 0, 0.9)";
    mensaje.style.color = "white";
    mensaje.style.padding = "10px 20px";
    mensaje.style.borderRadius = "5px";
    mensaje.style.fontSize = "1.2rem";
    mensaje.style.zIndex = "1000";
    mensaje.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    mensaje.style.opacity = "0";
    mensaje.style.transition = "opacity 0.3s ease, bottom 0.3s ease";

    document.body.appendChild(mensaje);

    // Aparecer animado
    requestAnimationFrame(() => {
        mensaje.style.opacity = "1";
        mensaje.style.bottom = "40px"; // sube un poco al aparecer
    });

    // Desaparecer después de 2 segundos
    setTimeout(() => {
        mensaje.style.opacity = "0";
        mensaje.style.bottom = "20px"; // baja al desaparecer
        mensaje.addEventListener("transitionend", () => mensaje.remove());
    }, 2000);
}

function mostrarMensaje(texto) {
    // Crear overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.7)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    // Mensaje
    const mensaje = document.createElement("div");
    mensaje.textContent = texto;
    mensaje.style.color = "white";
    mensaje.style.fontSize = "2rem";
    mensaje.style.marginBottom = "20px";
    overlay.appendChild(mensaje);

    // Botón reinicio
    const btn = document.createElement("button");
    btn.textContent = "Jugar de nuevo";
    btn.style.fontSize = "1.2rem";
    btn.style.padding = "10px 20px";
    btn.onclick = () => {
        location.reload(); // recarga la página
    };
    overlay.appendChild(btn);

    document.body.appendChild(overlay);
}
    document.addEventListener("keydown", e => {
        const tecla = e.key.toUpperCase();

        if (/^[A-ZÑ]$/.test(tecla)) pressKey(tecla);
        if (e.key === "Backspace") backspace();
        if (e.key === "Enter") checkWord();
    });
});
