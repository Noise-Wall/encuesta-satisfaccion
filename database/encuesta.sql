CREATE DATABASE EncuestaDeSatisfaccion;

USE EncuestaDeSatisfaccion;

CREATE TABLE Empresa(
	idEmpresa INT NOT NULL AUTO_INCREMENT,
	nombreEmpresa VARCHAR(255) NOT NULL,
	nombreContacto VARCHAR(255) NOT NULL,
	correo VARCHAR(60) NOT NULL,
	PRIMARY KEY (idEmpresa)
);

CREATE TABLE Pregunta(
	idPregunta INT NOT NULL AUTO_INCREMENT,
	contenidoPregunta LONGTEXT NOT NULL,
	idCategoria INT NOT NULL,
	enEncuesta BOOL NOT NULL
	PRIMARY KEY (idPregunta),
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT, 
	contenidoCategoria VARCHAR(80) NOT NULL,
	PRIMARY KEY (idCategoria)
);

CREATE TABLE Respuesta(
	idRespuesta INT NOT NULL AUTO_INCREMENT,
	idPregunta INT NOT NULL,
	idEmpresa INT NOT NULL,
	fecha DATE NOT NULL,
	valor INT NOT NULL,
	PRIMARY KEY (idRespuesta),
	FOREIGN KEY (idPregunta) REFERENCES Pregunta(idPregunta)
	FOREIGN KEY (idEmpresa) REFERENCES Encuesta(idEmpresa)
);

DESCRIBE Empresa;
DESCRIBE Categoria;
DESCRIBE Pregunta;
DESCRIBE Respuesta;