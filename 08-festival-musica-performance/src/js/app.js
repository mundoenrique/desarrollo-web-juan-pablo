document.addEventListener('DOMContentLoaded', function () {
  navegacionFija();
  crearGaleria();
  resaltarEnlace();
  scrollNav();
});

function navegacionFija() {
  const header = document.querySelector('.header');
  const sobreFestival = document.querySelector('.sobre-festival');

  window.addEventListener('scroll', function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  });
}

function crearGaleria() {
  const CANTIDAD_IMAGENES = 16;
  const galeria = document.querySelector('.galeria-imagenes');

  for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const imagen = document.createElement('IMG');
    imagen.loading = 'lazy';
    imagen.width = '300';
    imagen.height = '200';
    imagen.src = `src/img/gallery/thumb/${i}.jpg`;
    imagen.alt = 'Galeria';

    // Event handler
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(i) {
  const imagen = document.createElement('IMG');
  imagen.src = `src/img/gallery/full/${i}.jpg`;
  imagen.alt = `DJ ${1}`;

  // Generar modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.appendChild(imagen);
  modal.onclick = cerrarModal;

  // Botón cerrar moldal
  const cerrarModalBtn = document.createElement('BUTTON');
  cerrarModalBtn.textContent = 'X';
  cerrarModalBtn.classList.add('btn-cerrar');
  cerrarModalBtn.onclick = cerrarModal;

  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  // Agregar al html
  const body = document.querySelector('body');
  body.classList.add('overflow-hiddne');
  body.appendChild(modal);
}

function cerrarModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('fade-out');

  setTimeout(() => {
    modal?.remove();

    const body = document.querySelector('body');
    body.classList.remove('overflow-hiddne');
  }, 500);
}

function resaltarEnlace() {
  document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = this.querySelectorAll('.navegacion-principal a');

    let actual = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }

      navLinks.forEach((link) => {
        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + actual) {
          link.classList.add('active');
        }
      });
    });
  });
}

function scrollNav() {
  const navLinks = document.querySelectorAll('.navegacion-principal a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute('href');
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
