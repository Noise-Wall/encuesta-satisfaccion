const express = require("express");
const app = express();
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
require("dotenv").config();
const cors = require("cors");

// dev environment
if (process.env.ENV === "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// route files
const mainRoute = require("./routes/main");
const empresasRoute = require("./routes/empresa");
const categoriasRoute = require("./routes/categorias");
const preguntasRoute = require("./routes/preguntas");
const encuestaRoute = require("./routes/encuesta");
const respuestasRoute = require("./routes/respuestas");
const resultadosRoute = require("./routes/resultados");

// settings
app.set("port", process.env.PORT || 8080);
app.use(express.urlencoded({ extended: false }));
// otorga acceso al front end a hacer requests del API
app.use(
  cors({
    origin: `http://localhost:${process.env.HOST}`,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// mysql connection
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
  ),
);

// rutas
app.use("/", mainRoute);
app.use("/empresas", empresasRoute);
app.use("/categorias", categoriasRoute);
app.use("/preguntas", preguntasRoute);
app.use("/encuestas", encuestaRoute);
app.use("/respuestas", respuestasRoute);
app.use("/resultados", resultadosRoute);
// ruta 404
app.all("*", (req, res) =>
  res.status(404).json({
    data: [],
  })
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening on port ${process.env.PORT || 8080}...`);
});
