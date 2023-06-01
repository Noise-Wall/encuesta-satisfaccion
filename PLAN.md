### 26-ABR

- ~~(**Importante**) Averiguar como poder acceder a la ruta Admin sin tener que entrar mediante un link en la vista principal~~ *Hecho mediante WebHashHistory*
- ~~Adornar el <section>~~
- ~~Anadir la tabla de usuarios a la vista Admin, que muestre solamente el ID y el nombre del usuario~~
- ~~Anadir la creacion de usuarios~~
- ~~Quitar la tabla de respuestas a la vista Admin~~
- ~~Hacer una ruta en el backend para recabar cuantas respuestas ha tenido una cierta pregunta, para despues ser implementada como una grafica~~
- Implementar la creacion de graficas
- (*Tentativo*) Separar la vista resumen de las encuestas en un apartado diferente
- Terminar el README
- ~~Separar mas limpiamente los componentes por carpetas~~
- (*Tentativo*) Fragmentar las hojas de estilo para que solo se use donde se necesite.

---

### 28-ABR

- ~~(**Importante**) Introducir rate-limiting para prevenir ataques de fuerza bruta~~
- ~~Anadir un header especial para limitar el acceso al API~~
    - ~~El header vendria del cliente unicamente~~
    - ~~(*Tentativo*) Despues de que el API reciba el header, manda un cookie al cliente para poder continuar con la comunicacion.~~

---

### 2-MAY

- Implementar paso de mensajes de estatus a las varias vistas cuando se realice una accion y se pushee a otra ruta.
- ~~Redecorar la seleccion de categorias~~
- Marcar error si la base de datos no carga
- Implementar el link de despertado

---

### 4-MAY

- (**Seguridad**)(*Tentativo*) Implementar limites de tamano por peticion. En Node.JS, utilizar paquete raw-body.

---

### 12-MAY

- Agregar ruta de recuperacion de contrasena

### 15-MAY

- Agregar documentacion a los parametros de la tabla
- Necesita ser mas sturdy la app cuando no hay valores dentro
- ~~Organizar preguntas mejor (categoria > preguntas)~~
- (**Tentativo**) brindar opcion de editar datos a empresa
- Separar tablas de AdminView para mostrar contenido en vez de IDs.
- Agregar confirmacion a todos los edits y deletes que no se supone deben usarse.
- Cambiar la habilitacion a un boton y un label verde/rojo
- ~~Cachar las queries que responden con error~~
- ~~Cambiar la visualizacion de las preguntas a una vista ajena, en vez de entrar a ella mediante las preguntas como con las encuestas.~~
- ~~Cambiar query de preguntas respuestas a dar info por ano.~~

### 18-MAY

- Ver plugin AutoTable del jsPDF
- ~~Implementar limite de objetos mostrados en tablas ()~~
- Implementar modulos, para no estar importando los archivos completos al requerir una sola funcion
- ~~Implementar parametros GET en la vista Admin, para seleccionar la tabla y la página (y para quitar de una buena vez la categoria)~~
    - ~~Para la paginacion, agregar a todas las rutas un parametro extra de paginado~~


### 26-MAY

- Hacer lo siguiente

```
isTimeout > runTimeout

isLogin > validateLogin

refs into simple getFromApi

possibly process router pushes and route info on a separate file?


button component with default onclick as push

external loading component

external seleccionar form component
```

- La clase menu  necesita acortarse cuando la pantalla es pequena

- Unir las clases menu y vista-nueva

- En vista resultados (preguntas), hacer refs los campos del formulario
    - Posible solucion para el colectado de empresas en Encuesta View

- exportar formatos de fecha