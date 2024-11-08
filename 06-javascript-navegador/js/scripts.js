// Seleccionar elementos...

// querySelector

const textoHeading = document.querySelector('.header__texto h2');
console.log(textoHeading);

textoHeading.textContent = 'Nuevo Heading'; // También se puede utilizar .text

// querySelectorAll
const enlaces = document.querySelectorAll('.navegacion a');
console.log(enlaces);

// Algunas operaciones...

// Cambiar el texto
enlaces[0].textContent = 'Nuevo Texto enlace';

// Cambiar el enlace del primer enlace
enlaces[0].href = 'google.com';

// Agregar una clase...
enlaces[0].classList.add('nueva-clase');

// Eliminar una clase...
// enlaces[0].classList.remove('navegacion__enlace');
