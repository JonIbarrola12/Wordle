function cargaPalabra(){
    let palabra
    const req = new XMLHttpRequest()
    req.open('GET','https://random-word-api.herokuapp.com/word?lang=es&length=5',false);
    req.send()
    palabra = JSON.parse(req.responseText)
    console.log(palabra[0])
    return palabra[0]
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

    // Convertimos la respuesta a JSON
    const data = JSON.parse(req.responseText);

    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    // Si pageId es -1 → palabra NO existe
    const existe = pageId !== "-1";

    console.log(existe);

    return existe;
}

let palabra = cargaPalabra();
palabra = palabra.toLowerCase();
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