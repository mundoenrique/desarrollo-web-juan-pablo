/* SERVICIOS */
INSERT INTO servicios ( nombre, precio ) VALUES
('Corte de Cabello Niño', 60),
('Corte de Cabello Hombre', 80),
('Corte de Barba', 60),
('Peinado Mujer', 80),
('Peinado Hombre', 60),
('Tinte',300),
('Uñas', 400),
('Lavado de Cabello', 50),
('Tratamiento Capilar', 150);

/* RESERVACIONES */
INSERT INTO reservaciones (nombre, apellido, hora, fecha, servicios) VALUES
('Juan', 'De la torre', '10:30:00', '2021-06-28', 'Corte de Cabello Adulto, Corte de Barba' ),
('Antonio', 'Hernandez', '14:00:00', '2021-07-30', 'Corte de Cabello Niño'),
('Pedro', 'Juarez', '20:00:00', '2021-06-25', 'Corte de Cabello Adulto'),
('Mireya', 'Perez', '19:00:00', '2021-06-25', 'Peinado Mujer'),
('Jose', 'Castillo', '14:00:00', '2021-07-30', 'Peinado Hombre'),
('Maria', 'Diaz', '14:30:00', '2021-06-25', 'Tinte'),
('Clara', 'Duran', '10:00:00', '2021-07-01', 'Uñas, Tinte, Corte de Cabello Mujer'),
('Miriam', 'Ibañez', '09:00:00', '2021-07-01', 'Tinte'),
('Samuel', 'Reyes', '10:00:00', '2021-07-02', 'Tratamiento Capilar'),
('Joaquin', 'Muñoz', '19:00:00', '2021-06-28', 'Tratamiento Capilar'),
('Julia', 'Lopez', '08:00:00', '2021-06-25', 'Tinte'),
('Carmen', 'Ruiz', '20:00:00', '2021-07-01', 'Uñas'),
('Isaac', 'Sala', '09:00:00', '2021-07-30', 'Corte de Cabello Adulto'),
('Ana', 'Preciado', '14:30:00', '2021-06-28', 'Corte de Cabello Mujer'),
('Sergio', 'Iglesias', '10:00:00', '2021-07-02', 'Corte de Cabello Adulto'),
('Aina', 'Acosta', '14:00:00', '2021-07-30', 'Uñas'),
('Carlos', 'Ortiz', '20:00:00', '2021-06-25', 'Corte de Cabello Niño'),
('Roberto', 'Serrano', '10:00:00', '2021-07-30', 'Corte de Cabello Niño'),
('Carlota', 'Perez', '14:00:00', '2021-07-01', 'Uñas'),
('Ana Maria', 'Igleias', '14:00:00', '2021-07-02', 'Uñas, Tinte'),
('Jaime', 'Jimenez', '14:00:00', '2021-07-01', 'Corte de Cabello Niño'),
('Roberto', 'Torres', '10:00:00', '2021-07-02', 'Corte de Cabello Adulto'),
('Juan', 'Cano', '09:00:00', '2021-07-02', 'Corte de Cabello Niño'),
('Santiago', 'Hernandez', '19:00:00', '2021-06-28', 'Corte de Cabello Niño'),
('Berta', 'Gomez', '09:00:00', '2021-07-01', 'Uñas'),
('Miriam', 'Dominguez', '19:00:00', '2021-06-28', 'Corte de Cabello Niño'),
('Antonio', 'Castro', '14:30:00', '2021-07-02', 'Corte de Cabello Adulti'),
('Hugo', 'Alonso', '09:00:00', '2021-06-28', 'Corte de Barba'),
('Victoria', 'Perez', '10:00:00', '2021-07-02', 'Uñas, Tinte'),
('Jimena', 'Leon', '10:30:00', '2021-07-30', 'Uñas, Corte de Cabello Mujer'),
('Raquel' ,'Peña', '20:30:00', '2021-06-25', 'Corte de Cabello Mujer');

/* CLIENTES */
INSERT INTO clientes (nombre, apellido, telefono, email) values
('Enrique', 'Peñaloza', '+584142547284', 'enrique.penaloza.working@gmail.com');

INSERT INTO clientes (nombre, apellido, telefono, email) values
('Yajaira', 'Espinoza', '+584127059849', 'yayita.espinoiza@gmail.com');

/* CITAS */
INSERT INTO citas (fecha, hora, clienteId) VALUES
('2024-11-13', '10:30:00', 1);

INSERT INTO citas (fecha, hora, clienteId) VALUES
('2024-11-14', '22:30:00', 2);

INSERT INTO citasServicios (citaId, servicioId) VALUES
(1,8);

INSERT INTO citasServicios (citaId, servicioId) VALUES
(1,3), (1,4);

INSERT INTO citasServicios (citaId, servicioId) VALUES
(2,5), (2,1);

