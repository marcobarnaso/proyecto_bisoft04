const portada = document.querySelector("#portada-libro");
const nombreLibro = document.querySelector("#nombre-libro");
const nombreAutor = document.querySelector("#nombre-autor");
const cantidad = document.querySelector("#cantidad-libros");
const btnEliminar = document.querySelector("#btn-eliminar");
const precio = document.querySelector("#precio-libro");
const descuento = document.querySelector("#porcentaje-descuento");
const total = document.querySelector("#suma-carrito-compras");
const btnCompra = document.querySelector("#btn-compra");

let data = JSON.parse(localStorage.getItem("libro"));

function populatePage() {
  portada.setAttribute("src", `/libro/portada/${data.isbn}`);
  nombreLibro.textContent += `${data.name}`;
  nombreAutor.textContent += `${data.author}`;
  precio.textContent += `${data.price}`;
  descuento.textContent += `${data.discount}`;
  if (descuento.value > 0) {
    defaultTotal =
      Number(data.price) * Number(cantidad.value) * (descuento.value / 100);
    total.textContent += `${defaultTotal}`;
    return;
  }
  defaultTotal = Number(data.price) * Number(cantidad.value);
  total.textContent += `${defaultTotal}`;
}

cantidad.addEventListener("change", () => {
  if (Number(cantidad.value) <= 0) {
    btnCompra.style.visibility = "hidden";
    btnEliminar.style.visibility = "hidden";
    Swal.fire({
      icon: "error",
      title: `La cantidad de libros no puede ser negativa o cero`,
    });
    return;
  }
  btnEliminar.style.visibility = "visible";
  btnCompra.style.visibility = "visible";
  totalBuy = data.price * cantidad.value;
  total.textContent = `${totalBuy}`;
  console.log(total.value)
});

btnEliminar.addEventListener("click", () => {
  cantidad.value-=1;
  if (Number(cantidad.value) <= 0) {
    btnCompra.style.visibility = "hidden";
    btnEliminar.style.visibility = "hidden";
    Swal.fire({
      icon: "error",
      title: `La cantidad de libros no puede ser negativa o cero`,
    });
    return;
  }
  btnEliminar.style.visibility = "visible";
  btnCompra.style.visibility = "visible";
  totalBuy = data.price * cantidad.value;
  total.textContent = `${totalBuy}`;  
});

btnCompra.addEventListener('click', ()=> {
  let totalToSend = data.price * cantidad.value
  localStorage.setItem('totalCompra', totalToSend)
})
populatePage();
