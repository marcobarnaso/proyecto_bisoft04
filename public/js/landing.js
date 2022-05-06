const botonNext = document.querySelector(".next");
const botonPrevious = document.querySelector(".previous");
const botonNext1 = document.querySelector(".next1");
const botonPrevious1 = document.querySelector(".previous1");
const container = document.querySelector(".container-horizontal-scroll");
const container1 = document.querySelector(".container-horizontal-scroll1");
const masVendido1 = document.querySelector("#mas-vendidos-1")

function slide(direction, container) {
  scrollCompleted = 0;
  let slideVar = setInterval(function () {
    if (direction == "left") {
      container.scrollLeft -= 10;
    } else {
      container.scrollLeft += 10;
    }
    scrollCompleted += 10;
    console.log(scrollCompleted);
    if (scrollCompleted >= 100) {
      window.clearInterval(slideVar);
    }
  }, 35);
}

botonNext.addEventListener("click", () => {
  console.log("hi");
  let slideRight = event.target.value;
  console.log(slideRight);
  slide(slideRight, container);
  document.querySelector(".modal").classList.remove("show-modal");
  document.querySelector(".modal").style.position = "relative";
  document.querySelector(".show-modal").style.position = "relative";
});

botonPrevious.addEventListener("click", () => {
  console.log("hi");
  let slideLeft = event.target.value;
  console.log(slideLeft);
  slide(slideLeft, container);
  document.querySelector(".modal").classList.remove("show-modal");
  document.querySelector(".modal").style.position = "relative";
  document.querySelector(".show-modal").style.position = "relative";
});

botonNext1.addEventListener("click", () => {
  console.log("hi");
  let slideRight = event.target.value;
  console.log(slideRight);
  slide(slideRight, container1);
});

botonPrevious1.addEventListener("click", () => {
  console.log("hi");
  let slideLeft = event.target.value;
  console.log(slideLeft);
  slide(slideLeft, container1);
});

async function getLibroId() {
  let buscarIsbn = masVendido1.getAttribute('isbn')
  let libro = await buscarLibro(`libro/buscar/${buscarIsbn}`)
  console.log(libro)
  localStorage.setItem("libro", JSON.stringify(libro));
  window.location.href = "libro";
}

async function insertarMasVendidos(){
  const libros = await masVendidos()
  masVendido1.setAttribute('isbn', `${libros[0].isbn}`)
  masVendido1.innerHTML=`
  <img src="/libro/portada/${libros[0].isbn}" isbn="${libros[0].isbn}" alt="${libros[0].name}">
  `
}

insertarMasVendidos()

document.querySelector("#mas-vendidos-1").addEventListener("click", getLibroId);
