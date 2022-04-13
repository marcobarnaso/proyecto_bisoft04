const perfilDiv = document.querySelector('.test')

let libro = JSON.parse(localStorage.getItem('libro'))
console.log(libro)

    let tituloP = document.createElement('p')
    tituloP.innerText = libro.titulo
    perfilDiv.appendChild(tituloP)


    
