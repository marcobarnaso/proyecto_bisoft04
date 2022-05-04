const botonNext = document.querySelector(".next");
const botonPrevious = document.querySelector(".previous");
const botonNext1 = document.querySelector(".next1");
const botonPrevious1 = document.querySelector(".previous1");
const container = document.querySelector(".container-horizontal-scroll");
const container1 = document.querySelector(".container-horizontal-scroll1");

const pais = document.querySelector("#slt-pais");
const foto = document.querySelector("#txt-foto");
const nombre = document.querySelector("#txt-nombre");
const nacimiento = document.querySelector("#txt-Fecha");
const defuncion = document.querySelector("#txt-fechaDef");
const librosPublicados = document.querySelector("#txt-Libros");
const premios = document.querySelector("#txt-premios");
const resena = document.querySelector("#resena");
const btnRegistrar = document.querySelector("#btn-registrar");

// document.addEventListener("click", (e) => {
//   const isDropdownButton = e.target.matches("[data-dropdown-button]");
//   if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

//   let currentDropdown;
//   if (isDropdownButton) {
//     currentDropdown = e.target.closest("[data-dropdown]");
//     currentDropdown.classList.toggle("active");
//   }

//   document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
//     if (dropdown === currentDropdown) return;
//     dropdown.classList.remove("active");
//   });
// });

const formEl = document.querySelector("form");
const tbodyEl = document.querySelector("tbody");
const tableEl = document.querySelector("table");

async function populateAuthorTable() {
  let authorData = await obtenerDatos("autor");
  console.log(authorData)
  authorData.forEach((author) => {
    tbodyEl.innerHTML += `
    <tr>
        <td>${author.country}</td>
        <td>${author.picture}</td>
        <td>${author.name}</td>
        <td>${author.birthDate}</td>
        <td>${author.deceased}</td>
        <td>${author.publishedBooks}</td>
        <td>${author.awards}</td>
        <td>${author.review}</td>
        <td><button class="deleteBtn">Borrar</button></td>
    </tr>
`;
  });
}

function onAddWebsite() {
  tbodyEl.innerHTML += `
    <tr>
        <td>${pais.value}</td>
        <td>${foto.value}</td>
        <td>${nombre.value}</td>
        <td>${nacimiento.value}</td>
        <td>${defuncion.value}</td>
        <td>${librosPublicados.value}</td>
        <td>${premios.value}</td>
        <td>${resena.value}</td>
        <td><button class="deleteBtn">Borrar</button></td>
    </tr>
`;
}

function onDeleteRow(e) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }

  const btn = e.target;
  btn.closest("tr").remove();
}

tableEl.addEventListener("click", onDeleteRow);

let inputValidator = {
    "slt-pais": false,
    "txt-foto": false,
    "txt-nombre": false,
    "txt-Fecha": false,
    "txt-fechaDef": false,
    "txt-Libros": false,
    "txt-premios": false,
    "resena": false,
  };
  
  let formElements = document.querySelectorAll('#registrar-autor')
  
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
        btnRegistrar.disabled = false;
      } else {
        btnRegistrar.disabled = true;
      }
    });
  });

function getData() {
  let data = {
    picture: foto.value,
    country: pais.value,
    name: nombre.value,
    birthDate: nacimiento.value,
    deceased: defuncion.value,
    publishedBooks: librosPublicados.value,
    awards: premios.value,
    review: resena.value,
  };
  registrarAutor("autor", data);
  document.getElementById("registrar-autor").reset();
}

btnRegistrar.addEventListener("click", () => {
  onAddWebsite();
  getData();
});

populateAuthorTable()