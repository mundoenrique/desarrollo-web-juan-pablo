// "use strict"; // Correr JS en modo estricto
// Objetos
const producto = {
  nombreProducto: 'Monitor 20 Pulgadas',
  precio: 300,
  disponible: true,
};

// .freeze .seal
Object.seal(producto);
producto.precio = 500;
Object.freeze(producto);

producto.precio = 'NUEVO PRECIO';
producto.imagen = 'imgen.jpg';

delete producto.precio;

console.log(producto);
