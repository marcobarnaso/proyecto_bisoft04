
//revisa que el usuario este conectado para realizar ciertas acciones
if(!localStorage.getItem('usuarioConectado')) {
    window.location.href = 'login.html'
}

let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'))

document.querySelector('.nombre-usuario').textContent = usuarioConectado.nombre