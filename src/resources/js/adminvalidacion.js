const botonregistrar = document.getElementById('btn-registrar');
const inputPais = document.getElementById('slt-pais');
const inputfoto = document.getElementById('txt-foto');
const inputnombre = document.getElementById('txt-nombre');
const inputfechaN = document.getElementById('txt-Fecha');
const inputfechaD = document.getElementById('txt-fechaDef');
const inputlibros = document.getElementById('txt-Libros');
const inputPremioNo = document.getElementById('txt-nobel');
const inputPremiNoAnno = document.getElementById('txt-nobelanno');
const inputResennaV = document.getElementById('txt-resenna');
const inputPremiosL = document.getElementById('slt-premiosL');


const validar = () => {
    let hayError = false;

    if (inputPais.value == '') {
        hayError = true;
    } else {

    }
    if (inputnombre.value == '') {
        hayError = true;
    } else {

    }
    if (inputfechaN.value == '') {
        hayError = true;
    } else {

    }
    if (inputfechaD.value == '') {
        hayError = true;
    } else {

    }

    if (inputlibros.value == '') {
        hayError = true;
    } else {

    }
    if (inputPremioNo.value == '') {
        hayError = true;
    } else {

    }

    if (inputPremiNoAnno.value == '') {
        hayError = true;
    } else {

    }

    if (inputResennaV.value.value == '') {
        hayError = true;
    } else {

    }

    if (inputPremiosL.value.value == '') {
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