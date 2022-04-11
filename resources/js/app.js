const tipo_id = ["Cédula", "Pasaporte", "Otro"];
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
let cvvInput = document.querySelector("#cvv");
let tarjetaInput = document.querySelector("#tarjeta");
let identificacionInput = document.querySelector("#identificacion");

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
  obtener_distritos(1)
  select_canton.removeAttribute('disabled')
  select_distrito.removeAttribute('disabled')
});

select_canton.addEventListener("change", () => {
  let canton_id = event.target.value;
  select_distrito.innerHTML = "";

  obtener_distritos(canton_id);
});

select_id.addEventListener("change", () => {
  document.querySelector(".slt-id-title").style.display = "none";
});

cvvInput.oninput = function () {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
};

tarjetaInput.oninput = function () {
  if (this.value.length > 16) {
    this.value = this.value.slice(0, 16);
  }
};

identificacionInput.oninput = function () {
  if (this.value.length > 9) {
    this.value = this.value.slice(0, 9);
  }
};

let usuarioForm = document.querySelectorAll(".registrar-usuario");
let btnRegistro= document.querySelector(".btn-registro");

let inputValidator = {
  "nombre": false,
  "primer-apellido": false,
  "segundo-apellido": false,
  "email": false,
  "telefono": false,
  "contrasena": false,
  "confirmar-contrasena": false,
  "tipo-id": false,
  "identificacion": false,
  "provincia": false,
  "direccion-exacta": false,
  "nombre-tarjeta": false,
  "tarjeta": false,
  "fecha-expiracion": false,
  "cvv": false
};

usuarioForm.forEach((e) => {
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
      btnRegistro.disabled = false;
    } else {
      btnRegistro.disabled = true;
    }
  });
});

btnRegistro.addEventListener('click', ()=>{
  Swal.fire(
    "Bienvenido",
    `${listaUsuarios[0].nombre}`,
    "success"
  ).then(()=>{
    window.location.href = 'landing.html'
    localStorage.setItem('usuarioConectado', listaUsuarios[0])
  })
})