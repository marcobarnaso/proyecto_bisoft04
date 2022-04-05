const botonNext = document.querySelector(".next");
const botonPrevious = document.querySelector(".previous");
const botonNext1 = document.querySelector(".next1");
const botonPrevious1 = document.querySelector(".previous1");
const container = document.querySelector(".container-horizontal-scroll");
const container1 = document.querySelector(".container-horizontal-scroll1");

function slide(direction, container) {
  scrollCompleted = 0;
  let slideVar = setInterval(function () {
    if (direction == "left") {
      container.scrollLeft -= 10;
    } else {
      container.scrollLeft += 10;
    }
    scrollCompleted += 10;
    console.log(scrollCompleted);
    if (scrollCompleted >= 100) {
      window.clearInterval(slideVar);
    }
  }, 35);
}

botonNext.addEventListener("click", () => {
  console.log("hi");
  let slideRight = event.target.value;
  console.log(slideRight);
  slide(slideRight, container);
});

botonPrevious.addEventListener("click", () => {
  console.log("hi");
  let slideLeft = event.target.value;
  console.log(slideLeft);
  slide(slideLeft, container);
});

botonNext1.addEventListener("click", () => {
  console.log("hi");
  let slideRight = event.target.value;
  console.log(slideRight);
  slide(slideRight, container1);
});

botonPrevious1.addEventListener("click", () => {
  console.log("hi");
  let slideLeft = event.target.value;
  console.log(slideLeft);
  slide(slideLeft, container1);
});

document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle('active')
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});
