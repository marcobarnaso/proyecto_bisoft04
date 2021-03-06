const customHead = document.createElement("template");
const customNav = document.createElement("template");
customHead.innerHTML = `
<div class="logo">
<img src="/img/lovelace.jpeg" alt="lovelace" style="width:100px; border-radius:50%">
</div>
<div class="container-busqueda">
</div>
</section>
`;
customNav.innerHTML = `
<div class="dropdown" data-dropdown>
<button administrador="admin" class="link" style="display:none" data-dropdown-button onclick="window.location='/admin'">Administrador</button>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button onclick="window.location='/'">Página Principal</button>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Catálogo</button>
<div class="dropdown-menu">
    <a href="/catalogo-libros" class="link">Libros</a>
    <a href="/catalogo-autores" class="link">Autores</a>
</div>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Búsqueda</button>
<div class="dropdown-menu">
    <a href="/catalogo-libros" class="link">Libros</a>
    <a href="#" class="link">Autores</a>
</div>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button onclick="window.location='/nosotros'">Acerca de nosotros</button>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Perfil</button>
<div class="dropdown-menu">
    <a status="logged-out-only" href="/login" class="link">Ingresar</a>
    <a status="logged-out-only" href="/registro" class="link">Crear cuenta</a>
    <a status="login-only" href="/usuario" class="link">Cuenta</a>
    <a logout = call status="login-only" class="link">Log out</a>
</div>
</div>
`
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
  logout('/')
})

let currentUser = JSON.parse(localStorage.getItem('usuarioConectado'))
if(currentUser.user.type == 1) {
  document.querySelector('[administrador="admin"]').removeAttribute("style")
} 
