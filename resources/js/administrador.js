const generos = document.querySelector(".container-genero-literario");
const generoInput = document.querySelector(".genero-literario-input");
let generos_literarios = ["Misterio", "Ciencia", "Auto Biografía"];

function addGenere() {
  while (generos.lastChild) {
    generos.removeChild(generos.lastChild);
  }
  repetido = false;

  generos_literarios.forEach((genero) => {
    if (genero == generoInput.value) {
      repetido = true;
      Swal.fire(
        "Género literario repetido",
        "Los géneros literarios deben ser únicos",
        "error"
      );
    }
  });

  if (!repetido && generoInput.value != "") {
    generos_literarios.push(generoInput.value);
    Swal.fire("Éxito", "Género literario agregado correctamente", "success");
  }

  generos_literarios.forEach((genero) => {
    let newP = document.createElement("p");
    newP.innerText = genero;
    generos.appendChild(newP);
  });

  generoInput.value = "";
}

function removeGenere() {
  contador = 0;
  generos_literarios.forEach((genero) => {
    if (genero == generoInput.value) {
      generos_literarios.pop(genero);
      generos.removeChild(generos.children[contador]);
    }
    contador += 1;
  });
  if (generoInput.value != "") {
    Swal.fire("Éxito", "Género literario removido correctamente", "success");
  }
  generoInput.value = "";
}

addGenere();

document
  .querySelector(".agregar-genero-literario")
  .addEventListener("click", addGenere);
document
  .querySelector(".remover-genero-literario")
  .addEventListener("click", removeGenere);

const tipo_id = ["Cédula Física", "Cédula Jurídica", "Otro"];
const provincias = [
  "San Jose",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limon",
];

const cantonesURL = "https://ubicaciones.paginasweb.cr/provincia/";
let distritosURL = "";

let select_id = document.querySelector("#tipo-id");
let select_provincia = document.querySelector("#provincia");
let select_canton = document.querySelector("#canton");
let select_distrito = document.querySelector("#distrito");

for (i = 0; i < tipo_id.length; i++) {
  let option = document.createElement("option");
  option.value = tipo_id[i];
  option.innerText = tipo_id[i];
  select_id.appendChild(option);
}

for (i = 0; i < provincias.length; i++) {
  let option = document.createElement("option");
  option.value = [i + 1];
  option.innerText = provincias[i];
  select_provincia.appendChild(option);
}

const obtener_cantones = async (provincia) => {
  const response = await fetch(`${cantonesURL}${provincia}/cantones.json`);
  const myJson = await response.json();
  const result = Object.entries(myJson);
  result.forEach((canton) => {
    let option = document.createElement("option");
    option.value = canton[0];
    option.innerText = canton[1];
    select_canton.appendChild(option);
  });
};

const obtener_distritos = async (canton) => {
  const response = await fetch(
    `${distritosURL}/canton/${canton}/distritos.json`
  );
  const myJson = await response.json();
  const result = Object.entries(myJson);
  result.forEach((distrito) => {
    let option = document.createElement("option");
    option.value = distrito[0];
    option.innerText = distrito[1];
    select_distrito.appendChild(option);
  });
};

select_provincia.addEventListener("change", () => {
  document.querySelector(".slt-provincia-title").style.display = "none";
  provincia_id = event.target.value;
  distritosURL = `https://ubicaciones.paginasweb.cr/provincia/${provincia_id}`;
  select_canton.innerHTML = "";
  while (select_canton.lastChild) {
    select_canton.removeChild(select_canton.lastChild);
  }
  while (select_distrito.lastChild) {
    select_distrito.removeChild(select_distrito.lastChild);
  }
  obtener_cantones(provincia_id);
  obtener_distritos(1);
  select_canton.removeAttribute("disabled");
  select_distrito.removeAttribute("disabled");
});

select_canton.addEventListener("change", () => {
  let canton_id = event.target.value;
  select_distrito.innerHTML = "";

  obtener_distritos(canton_id);
});

select_id.addEventListener("change", () => {
  document.querySelector(".slt-id-title").style.display = "none";
});

let sociosForm = document.querySelectorAll(".socio-input");
let registrarSocio = document.querySelector(".registrar-socio");

let inputValidator = {
  "nombre": false,
  "email": false,
  "telefono": false,
  "tipo-id": false,
  "identificacion": false,
  "provincia": false,
  "direccion-exacta": false,
};

sociosForm.forEach((e) => {
  e.addEventListener("input", () => {
    let nameAtt = event.target.getAttribute("name");
    if (event.target.value.length > 0) {
      inputValidator[nameAtt] = true;
    } else {
      inputValidator[nameAtt] = false;
    }
    let allTrue = Object.keys(inputValidator).every((item) => {
      return inputValidator[item] === true;
    });
    if (allTrue) {
      registrarSocio.disabled = false;
    } else {
      registrarSocio.disabled = true;
    }
  });
});

registrarSocio.addEventListener('click', ()=>{
    Swal.fire("Éxito", "Socio Comercial registrado correctamente", "success");
    document.querySelector('#registro-socio-comercial').reset()
})

const inputBusquedaSocio = document.querySelector("#busqueda-socios");
const socioInformacion = document.querySelector(".socio-informacion");
const mapSrc = document.querySelector("iframe");
let termino = "";

document.querySelector(".buscar-socio").addEventListener("click", () => {
  while (socioInformacion.lastChild) {
    socioInformacion.removeChild(socioInformacion.lastChild);
  }
  socios_comerciales.forEach((socio) => {
    if (socio.provincia == inputBusquedaSocio.value) {
      console.log(socio.provincia, inputBusquedaSocio.value);
      console.log("Hola!");
      let newList = document.createElement("ul");
      let newListElement1 = document.createElement("li");
      newListElement1.innerText = `Socio: ${socio.nombre}`;
      termino = socio.nombre;
      console.log(termino);
      newList.appendChild(newListElement1);

      let newListElement2 = document.createElement("li");
      let newSpan = document.createElement("span");
      newSpan.textContent = "Correo: ";
      newListElement2.innerText = `Correo: ${socio.correo}`;
      newList.appendChild(newListElement2);

      let newListElement3 = document.createElement("li");
      newListElement3.innerText = `Identificación:${socio.identificacion}`;
      newList.appendChild(newListElement3);

      let newListElement4 = document.createElement("li");
      newListElement4.innerText = `Dirección ${socio.direccion}`;
      newList.appendChild(newListElement4);

      socioInformacion.appendChild(newList);
    }
  });
  let mapSearchUrl = `https://maps.google.com/maps?q=${termino}&output=embed`;
  mapSrc.removeAttribute("src");
  mapSrc.setAttribute("src", mapSearchUrl);
  console.log(mapSrc.getAttribute("src"));
  inputBusquedaSocio.value = "";
});
