CREATE TABLE appsalon.servicios (
id int NOT NULL AUTO_INCREMENT,
nombre varchar(60) NOT NULL,
precio decimal(6,2) NOT NULL,
PRIMARY KEY (id)
);

DESCRIBE appsalon.servicios;
DROP TABLE appsalon.servicios;


CREATE TABLE appsalon.reservaciones (
id int NOT NULL AUTO_INCREMENT,
nombre varchar(60) NOT NULL,
apellido varchar(60) NOT NULL,
hora time DEFAULT NULL,
fecha date DEFAULT NULL,
servicios varchar(255) NOT NULL,
PRIMARY KEY (id)
);

DESCRIBE appsalon.reservaciones;
DROP TABLE appsalon.reservaciones;

CREATE TABLE appsalon.clientes (
id INT NOT NULL AUTO_INCREMENT,
nombre varchar(60) NOT NULL,
apellido varchar(60) NOT NULL,
telefono varchar(15) NOT NULL,
email varchar(100) NOT NULL UNIQUE,
PRIMARY KEY (id)
);

DESCRIBE appsalon.clientes;
DROP TABLE appsalon.clientes;

CREATE TABLE appsalon.citas (
id INT NOT NULL AUTO_INCREMENT,
fecha DATE NOT NULL,
hora TIME NOT NULL,
clienteId int NOT NULL,
PRIMARY KEY (id),
KEY clienteId (clienteId),
CONSTRAINT cliente_FK FOREIGN KEY (clienteId) REFERENCES clientes (id)
);

DESCRIBE appsalon.citas;
DROP TABLE appsalon.citas;

CREATE TABLE appsalon.citasServicios (
id INT NOT NULL AUTO_INCREMENT,
citaId INT NOT NULL,
servicioId INT NOT NULL,
PRIMARY KEY (id),
KEY citaId (citaId),
CONSTRAINT citas_FK FOREIGN KEY (citaId) REFERENCES citas (id),
KEY servicioId (servicioId),
CONSTRAINT servicios_FK FOREIGN KEY (servicioId) REFERENCES servicios (id)
);

DESCRIBE appsalon.citasServicios;
DROP TABLE appsalon.citasServicios;
