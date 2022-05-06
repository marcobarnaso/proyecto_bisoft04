const nombreLibro = document.querySelector('.nombre-libro')
const autor = document.querySelector('.nombre-autor')
const isbn = document.querySelector('.isbn')
const resena = document.querySelector('.resena')
const editorial = document.querySelector('.editorial')
const fechaPublicacion = document.querySelector('.publicacion')
const precio = document.querySelector('.precio')

function populatePage(){
    let data = JSON.parse(localStorage.getItem('libro'))
    console.log(data)
    nombreLibro.textContent+= `${data.name}`
    autor.textContent+= `${data.author}`
    isbn.textContent+= `${data.isbn}`
    resena.textContent+=  `${data.excerpt}`
    editorial.textContent+= `${data.editorial}`
    fechaPublicacion.textContent+= `${data.published}`
    precio.textContent+= `${data.price}`
}

populatePage()
