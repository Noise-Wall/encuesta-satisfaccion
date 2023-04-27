### to do

## Planes de la base de datos

Para poblar las preguntas, se tomaran todas las idCategorias existentes.
Luego se usara un loop de queries de todas las preguntas por categoria (preguntas.getByCategoria)

---

Se tendra almacenado el idEmpresa durante el llenado, asi como las ids de las preguntas

En cuanto se suba, se creara una encuesta y se subira a la tabla Encuesta;

Se iterara por las preguntas, empezando por subir la respuesta a la tabla Respuesta y despues subiendose la combinacion QA a su tabla.

---

Para ver una encuesta, se haran 2 tablas, una donde se concatene la tabla Encuesta y la tabla Empresa, y la otra donde se concatenen la tabla Pregunta y la tabla Respuesta mediante la tabla QA

