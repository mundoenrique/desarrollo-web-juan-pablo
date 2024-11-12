SELECT * FROM servicios s;

SELECT * FROM reservaciones r;

SELECT * FROM clientes c;

SELECT * FROM citas c;

SELECT * FROM citasServicios cs;

SELECT * FROM citas c
INNER JOIN clientes c2 ON c2.id = c.clienteId;

SELECT * FROM citas c
LEFT JOIN clientes c2 ON c2.id = c.clienteId;

SELECT * FROM citas c
RIGHT JOIN clientes c2 ON c2.id = c.clienteId;

SELECT * FROM citasServicios cs
LEFT JOIN citas c ON c.id = cs.citaId
LEFT JOIN servicios s ON s.id = cs.servicioId;

SELECT * FROM citasServicios cs
LEFT JOIN citas c ON c.id = cs.citaId
LEFT JOIN clientes c2 ON c.clienteId = c2.id 
LEFT JOIN servicios s ON s.id = cs.servicioId;
