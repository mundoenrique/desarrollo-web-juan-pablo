document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
});

function eventListeners() {
  const movilMenu = document.querySelector('.mobile-menu');

  movilMenu.addEventListener('click', navegacionResponsive);
}

function navegacionResponsive() {
  const navegacion = document.querySelector('.navegacion');

  navegacion.classList.toggle('mostrar');
}
