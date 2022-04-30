const botonNext = document.querySelector(".next");
const botonPrevious = document.querySelector(".previous");
const botonNext1 = document.querySelector(".next1");
const botonPrevious1 = document.querySelector(".previous1");
const container = document.querySelector(".container-horizontal-scroll");
const container1 = document.querySelector(".container-horizontal-scroll1");

const isbn = document.querySelector("#txt-Isbn");
const titulo = document.querySelector("#txt-titulo");
const autor = document.querySelector("#txt-Autor");
const editorial = document.querySelector("#txt-Editorial");
const publicacion = document.querySelector("#txt-Anno");
const resena = document.querySelector("#txt-Resenna");
const premio = document.querySelector("#txt-Premio");
const precio = document.querySelector("#txt-Precio");
const descuento = document.querySelector("#txt-Descuento");
const portada = document.querySelector("#txt-Imagen");
const genero = document.querySelector("#slt-Genero");
const registroBtn = document.querySelector("#btn-registrar");

// document.addEventListener("click", (e) => {
//     const isDropdownButton = e.target.matches("[data-dropdown-button]");
//     if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

//     let currentDropdown;
//     if (isDropdownButton) {
//         currentDropdown = e.target.closest("[data-dropdown]");
//         currentDropdown.classList.toggle('active')
//     }

//     document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
//         if (dropdown === currentDropdown) return;
//         dropdown.classList.remove("active");
//     });
// });

const formEl = document.querySelector("registrar-libro");
const tbodyEl = document.querySelector("tbody");
const tableEl = document.querySelector("table");

async function populateBookTable(){
    let bookData = await obtenerDatos('libros')
    bookData.forEach((libro)=>{
        tbodyEl.innerHTML += `
        <tr>
            <td>${libro.isbn}</td>
            <td>${libro.name}</td>
            <td>${libro.author}</td>
            <td>${libro.editorial}</td>
            <td>${libro.published}</td>
            <td>${libro.excerpt}</td>
            <td>${libro.awards}</td>
            <td>${libro.price}</td>
            <td>${libro.discount}</td>
            <td>${libro.cover}</td>
            <td>${libro.genere}</td>
            <td><button class="deleteBtn">Borrar</button></td>
        </tr>
    `;
    })
}

function onAddWebsite() {
  tbodyEl.innerHTML += `
    <tr>
        <td>${isbn.value}</td>
        <td>${titulo.value}</td>
        <td>${autor.value}</td>
        <td>${editorial.value}</td>
        <td>${publicacion.value}</td>
        <td>${resena.value}</td>
        <td>${premio.value}</td>
        <td>${precio.value}</td>
        <td>${descuento.value}</td>
        <td>${portada.value}</td>
        <td>${genero.value}</td>
        <td><button class="deleteBtn">Borrar</button></td>
    </tr>
`;
}

function onDeleteRow(e) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }

  const btn = e.target;
  const locateTR = btn.closest("tr")
  const isbnToDelete = locateTR.getElementsByTagName("td")[0].innerText
  locateTR.remove();
  let data = {
      "isbn": isbnToDelete
  }
  borrarLibro('libros', data)
}

tableEl.addEventListener("click", onDeleteRow);

function getData() {
  let data = {
    name: titulo.value,
    author: autor.value,
    isbn: isbn.value,
    editorial: editorial.value,
    published: publicacion.value,
    excerpt: resena.value,
    awards: premio.value,
    price: precio.value,
    discount: descuento.value,
    cover: portada.value,
    genere: genero.value,
  };
  registrarLibro("libros", data);
  document.getElementById("registrar-libro").reset();
}

registroBtn.addEventListener("click", ()=>{
    onAddWebsite()
    getData()
});

populateBookTable()