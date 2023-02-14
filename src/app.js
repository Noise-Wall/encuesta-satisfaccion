const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
const app = express();

// herramientas de development
if (!process.env.NODE_ENV) {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// importar routes
const mainRoute = require("./routes/index");
const preguntasRoute = require("./routes/preguntas");
const categoriasRoute = require("./routes/categorias");
const encuestaRoute = require("./routes/encuesta");
const responderRoute = require("./routes/responder");
const resultadosRoute = require("./routes/resultados");

// settings
app.set("port", process.env.PORT || 8080);
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// middlewares
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "AaBb123#",
      port: 3306,
      database: "EncuestaDeSatisfaccion",
    },
    "request"
  )
);
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// routes
// la ruta cliente es lo que se veria al contestarse la encuesta
app.use("/", mainRoute);
app.use("/preguntas", preguntasRoute);
app.use("/categorias", categoriasRoute);
app.use("/encuesta", encuestaRoute);
app.use("/responder", responderRoute);
app.use("/resultados", resultadosRoute);
// codigo 404 para rutas no existentes
app.all("*", (req, res) => res.status(404).render("404"));

app.listen(8080, () => console.log("Server is listening on port 8080..."));
