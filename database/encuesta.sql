CREATE DATABASE EncuestaDeSatisfaccion;

USE EncuestaDeSatisfaccion;

CREATE TABLE Empresa(
	idEmpresa INT NOT NULL AUTO_INCREMENT,
	nombreEmpresa VARCHAR(255) NOT NULL,
	nombreContacto VARCHAR(255) NOT NULL,
	correo VARCHAR(100) NOT NULL,
	PRIMARY KEY (idEmpresa)
);

CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT, 
	contenidoCategoria VARCHAR(80) NOT NULL,
	PRIMARY KEY (idCategoria)
);

CREATE TABLE Pregunta(
	idPregunta INT NOT NULL AUTO_INCREMENT,
	contenidoPregunta LONGTEXT NOT NULL,
	idCategoria INT NOT NULL,
	deshabilitada INT,
	PRIMARY KEY (idPregunta),
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Encuesta(
	idEncuesta INT NOT NULL AUTO_INCREMENT,
	fecha DATE NOT NULL,
	comentarios LONGTEXT,
	idEmpresa INT NOT NULL,
	PRIMARY KEY (idEncuesta),
	FOREIGN KEY (idEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Respuesta(
	idRespuesta INT NOT NULL AUTO_INCREMENT,
	valor INT,
	idPregunta INT NOT NULL,
	idEncuesta INT NOT NULL,
	PRIMARY KEY (idRespuesta),
	FOREIGN KEY (idPregunta) REFERENCES Pregunta(idPregunta),
	FOREIGN KEY (idEncuesta) REFERENCES Encuesta(idEncuesta)
);

CREATE TABLE Usuarios(
	idUsuario INT NOT NULL AUTO_INCREMENT,
	nombreUsuario VARCHAR(30) NOT NULL,
	contrasena VARCHAR(60) NOT NULL,
	PRIMARY KEY (idUsuario)
);

DESCRIBE Empresa;
DESCRIBE Categoria;
DESCRIBE Pregunta;
DESCRIBE Encuesta;
DESCRIBE Respuesta;
DESCRIBE Usuarios;