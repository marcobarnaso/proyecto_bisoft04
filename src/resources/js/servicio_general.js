const registrarDatos = async(endpoint, data, redireccion) => {
    let url = `http://localhost:3000/${endpoint}`;

    await axios({
        'url': url,
        'method': 'post',
        'responseType': 'json',
        'data': data
    }).then(response => {
        Swal.fire({
            'icon': 'success',
            'title': 'Felicidades',
            'text': response.data.msj
        }).then(() => {
            window.location.href = redireccion;
        });
    }).catch(error => {
        Swal.fire({
            'icon': 'error',
            'title': 'Ha ocurrido un error',
            'text': error
        })
    });

};

const obtenerDatos = async(endpoint) => {
    let url = `http://localhost:3000/${endpoint}`;
    let listaDatos = [];
    await axios({
            'url': url,
            'method': 'get',
            'responseType': 'json'
        })
        .then(response => {
            listaDatos = response.data.lista;
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                text: error
            });
        });

    return listaDatos;
};
