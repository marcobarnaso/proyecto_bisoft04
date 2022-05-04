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

async function populateBookTable() {
  let bookData = await obtenerDatos("libros");
  bookData.forEach(async (libro) => {
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
            <td><img src="/libro/portada/${libro.isbn}"></img></td>
            <td>${libro.genere}</td>
            <td><button class="deleteBtn">Borrar</button></td>
        </tr>
    `;
  });
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
  const locateTR = btn.closest("tr");
  const isbnToDelete = locateTR.getElementsByTagName("td")[0].innerText;
  locateTR.remove();
  let data = {
    isbn: isbnToDelete,
  };
  borrarLibro("libros", data);
}

let inputValidator = {
  "txt-Isbn": false,
  "txt-titulo": false,
  "txt-Autor": false,
  "txt-Editorial": false,
  "txt-Anno": false,
  "txt-Resenna": false,
  "txt-Premio": false,
  "txt-Precio": false,
  "txt-Descuento": false,
  "slt-Genero": false,
};

let formElements = document.querySelectorAll("#registrar-libro");

formElements.forEach((e) => {
  e.addEventListener("input", () => {
    let nameAtt = event.target.getAttribute("id");
    if (event.target.value.length > 0) {
      inputValidator[nameAtt] = true;
    } else {
      inputValidator[nameAtt] = false;
    }
    let allTrue = Object.keys(inputValidator).every((item) => {
      return inputValidator[item] === true;
    });
    if (allTrue) {
      registroBtn.disabled = false;
    } else {
      registroBtn.disabled = true;
    }
  });
});

tableEl.addEventListener("click", onDeleteRow);

async function getData() {
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
    genere: genero.value,
  };

  let image = {
    isbn: isbn.value,
    cover: portada.value,
  };

  await registrarLibro("libros", data)
  await uploadImage("libro/portada", image);
  document.getElementById("registrar-libro").reset();
}

registroBtn.addEventListener("click", () => {
  onAddWebsite();
  getData();
});

populateBookTable();
