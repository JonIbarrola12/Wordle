# Wordle  
Práctica de DWEC en el que vamos a replicar el juego Wordle  
## Creado por : *Jon Ibarrola Pulido*
## Funciones de la aplicacion:   
* Tienes 5 intentos para adivinar la palabra de 5 letras  
* Si adivinas la letra en su posicion esta aparecera en verde  
* Si adivinas la letra en otra posicion esta aparecera en amarillo   
* Si la letra no esta en la palabra aparecera en gris  
* Si se adivian la palabra o se te acaban los intentos aparecera una opción para volver a jugar  

## Tabla explicativa de Wordle
| Palabra | Feedback |
|---------|----------|
|Pesar|R-N-R-V-V|
|Estar|V-R-R-V-V|
|Echar|V-V-V-V-V|

## Enlace al proyecto en Github:
[Wordle](https://github.com/JonIbarrola12/Wordle.git)

## Foto del Wordle
![Foto de Wordle](https://static01.nyt.com/images/2022/01/31/crosswords/wordle-art/wordle-art-articleLarge.jpg?quality=75&auto=webp&disable=upscale)

## Fragmento de codigo Javascript:
```javascript
    function cargaPalabra(){
        let palabra
        const req = new XMLHttpRequest()
        req.open('GET','https://random-word-api.herokuapp.com/word?lang=es&length=5',false);
        req.send()
        palabra = JSON.parse(req.responseText)
        console.log(palabra[0])
        return palabra[0]
    }    
```


