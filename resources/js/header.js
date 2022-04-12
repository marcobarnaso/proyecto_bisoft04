const customHead = document.createElement("template");
const customNav = document.createElement("template");
customHead.innerHTML = `
<div class="logo">
<img src="/resources/img/lovelace.jpeg" alt="lovelace" style="width:100px; border-radius:50%">
</div>
<div class="container-busqueda">
</div>
</section>
`;
customNav.innerHTML = `
<div class="dropdown" data-dropdown>
<button administrador="admin" class="link" style="display:none" data-dropdown-button onclick="window.location='/pages/administrador.html'">Administrador</button>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button onclick="window.location='/pages/landing.html'">Home</button>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Catálogo</button>
<div class="dropdown-menu">
    <a href="/pages/perfil-libro.html" class="link">Libros</a>
    <a href="/pages/perfil-autor.html" class="link">Autores</a>
</div>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Busqueda</button>
<div class="dropdown-menu">
    <a href="#" class="link">Libros</a>
    <a href="#" class="link">Autores</a>
</div>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button onclick="window.location='/pages/nosotros.html'">Acerca de nosotros</button>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Perfil</button>
<div class="dropdown-menu">
    <a status="logged-out-only" href="/pages/login.html" class="link">Ingresar</a>
    <a status="logged-out-only" href="/pages/registration.html" class="link">Crear cuenta</a>
    <a status="login-only" href="/pages/perfil-usuario.html" class="link">Cuenta</a>
    <a logout = call status="login-only" class="link">Log out</a>
</div>
</div>
`
function logout(){
  localStorage.removeItem('usuarioConectado')
  console.log("AQUI")
}

document.querySelector("#head").appendChild(customHead.content);
document.querySelector("#navigation").appendChild(customNav.content);

document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

let showLoggedIn = document.querySelectorAll('[status="login-only"]')
let showLoggedOut = document.querySelectorAll('[status="logged-out-only"]')

if(!localStorage.getItem('usuarioConectado')){
  showLoggedIn.forEach(e=>{
    e.style.display="none"
  })
} else {
  showLoggedOut.forEach(e=>{
    e.style.display = "none"
  })
}

document.querySelector('[logout=call]').addEventListener('click', ()=>{
  Swal.fire(
    "Ha terminado su sesión exitosamente",
    "Vuelva pronto!",
    "success"
  ).then(()=>{
    window.location.href = 'landing.html'
    localStorage.removeItem('usuarioConectado')
  })
})

let currentUser = JSON.parse(localStorage.getItem('usuarioConectado'))
if(currentUser.tipo == 1) {
  document.querySelector('[administrador="admin"]').removeAttribute("style")
} 
