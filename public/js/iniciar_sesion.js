const input_usuario = document.querySelector('#loginUsuario')
const input_contrasena = document.querySelector('#loginContrasena')

const validar_credenciales = () => {
    let usuarioExiste = false
    listaUsuarios.forEach(usuario => {
        if((usuario.correo == input_usuario.value) && (usuario.contrasenna == input_contrasena.value)) {
            usuarioExiste = true
            localStorage.setItem('usuarioConectado', JSON.stringify(usuario))
        }
    })
    if(usuarioExiste == true) {
        let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'))
        Swal.fire(
            'Bienvenido!',
            `Hola ${usuarioConectado.nombre}`,
            'success'
          ).then(()=> {
            window.location.href = 'usuario'
        })
    } else {

    }
}

function getData(){
    let data = {
        email: input_usuario.value,
        password: input_contrasena.value
    }
    login('user/login', data, '/')
}

document.querySelector('.btn-ingresar').addEventListener('click', getData)