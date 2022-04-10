const customHead = document.createElement("template");
const customNav = document.createElement("template");
customHead.innerHTML = `
<div class="logo">
Logo
</div>
<div class="container-busqueda">
</div>
</section>
`;
customNav.innerHTML = `
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Catálogo</button>
<div class="dropdown-menu">
    <a href="#" class="link">Libros</a>
    <a href="#" class="link">Autores</a>
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
<button class="link" data-dropdown-button>Acerca de nosotros</button>
</div>
<div class="dropdown" data-dropdown>
<button class="link" data-dropdown-button>Perfil</button>
<div class="dropdown-menu">
    <a href="/pages/login.html" class="link">Ingresar</a>
    <a href="/pages/registration.html" class="link">Crear cuenta</a>
</div>
</div>`;

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
