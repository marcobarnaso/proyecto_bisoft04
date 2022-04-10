const botonregistrar = document.getElementById('btn-registrar');
const inputIsbn = document.getElementById('txt-Isbn');
const inputTitulo = document.getElementById('txt-titulo');
const inputAutor = document.getElementById('txt-Autor');
const inputEditorial = document.getElementById('txt-Editorial');
const inputFecha = document.getElementById('txt-Anno');
const inputPremio = document.getElementById('txt-Premio');
const inputResenna = document.getElementById('txt-Resenna');
const inputPrecio = document.getElementById('txt-Precio');
const inputDescuento = document.getElementById('txt-Descuento');

const validar = () => {
    let hayError = false;

    if (inputIsbn.value == '') {
        hayError = true;
    } else {

    }
    if (inputTitulo.value == '') {
        hayError = true;
    } else {

    }
    if (inputAutor.value == '') {
        hayError = true;
    } else {

    }
    if (inputEditorial.value == '') {
        hayError = true;
    } else {

    }

    if (inputFecha.value == '') {
        hayError = true;
    } else {

    }
    if (inputPremio.value == '') {
        hayError = true;
    } else {

    }

    if (inputResenna.value == '') {
        hayError = true;
    } else {

    }

    if (inputPrecio.value.value == '') {
        hayError = true;
    } else {

    }

    if (inputDescuento.value.value == '') {
        hayError = true;
    } else {

    }

    //validacion final

    if (hayError == true) {

        alert("Por favor revise los campos en blanco");
    } else {


    }

};

botonregistrar.addEventListener('click', validar)