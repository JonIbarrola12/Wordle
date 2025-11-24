function cargaPalabra(){
    const req = new XMLHttpRequest()
    req.open('GET','https://random-word-api.herokuapp.com/word?lang=es&length=5',false);
    req.send()
    palabra = JSON.parse(req.responseText)
    console.log(palabra[0])
    return palabra[0]
}    

