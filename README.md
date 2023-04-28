# Proyecto web de encuesta

Sitio web para la realizacion de una encuesta de satisfaccion al cliente, asi como el manejo de la informacion que provenga de esta.

La aplicación consiste en un servicio de front-end hecho en Vue.js, que puede ser hosteado como un servicio, o construirse en una página web estática, y un back-end Express.js, que necesita un servicio de Node.js que lo utilice.

## Requisitos

- Instalación de Node.js reciente.
- Npm o yarn.
- Servicio de hosting para back-ends de Node. (Render, Railway, Cyclic.sh, etc.)

## Instalación del front-end

1. Descargar el código mediante Git o manualmente.

```bash
git clone https://github.com/Noise-Wall/encuesta-satisfaccion.git
```

2. Correr el siguiente codigo en una terminal en la carpeta del proyecto.

```bash
cd ./client
npm install
npm run build
```

3. Aparecerá una carpeta en el directorio *./client* de nombre *./dist.*. Esta contendrá los archivos estáticos, listos para ser subidos a un host web.