const provincia = document.querySelector('#provincia')
const canton =  document.querySelector('#canton')
const distrito = document.querySelector('#distrito')
const direccion = document.querySelector('#direccion-exacta')
const radioUsarLibroFan = document.querySelector('#no-usar')
const radioNoUsarLibroFan = document.querySelector('#usar')
const radioMetodo1 = document.querySelector('#Metodo1')
const total = document.querySelector("#suma-carrito-compras");
const btnPagar = document.querySelector('#btn-pagar')

function populatePage() {
    let data = JSON.parse(localStorage.getItem('usuarioConectado'))
    let data2 = JSON.parse(localStorage.getItem('totalCompra'))
    provincia.setAttribute('value', `${data.user.provincia}`)
    canton.setAttribute('value', `${data.user.canton}`)
    distrito.setAttribute('value', `${data.user.distrito}`)
    direccion.textContent+= `${data.user.address}`
    radioNoUsarLibroFan.checked = true
    radioMetodo1.checked = true
    total.textContent = `${data2}`
}

btnPagar.addEventListener('click', ()=> {
    Swal.fire({
        icon: "success",
        title: `Compra Exitosa`,
      }).then((e)=>{
        window.location = '/'
      })
})

populatePage()