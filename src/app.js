const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
const app = express();
require("dotenv").config();

// herramientas de development
if (process.env.ENV === "dev") {
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
      host: process.env.HOST,
      user: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      port: process.env.DBPORT,
      database: process.env.DBNAME,
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

console.log(new Date());

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}...`)
);
