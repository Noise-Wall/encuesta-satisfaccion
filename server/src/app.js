require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const myConnection = require("express-myconnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { stdRateLimiter } = require("./controllers/rateLimit");

// archivos de routes
const mainRoute = require("./routes/main");
const empresasRoute = require("./routes/empresa");
const categoriasRoute = require("./routes/categorias");
const preguntasRoute = require("./routes/preguntas");
const encuestaRoute = require("./routes/encuesta");
const respuestasRoute = require("./routes/respuestas");
const latestRoute = require("./routes/latest");
const userRoute = require("./routes/user");
const resultadosRoute = require("./routes/resultados");

// configura el puerto
app.set("port", process.env.PORT || 8080);

// permite al servidor recibir y enviar archivos de tipo form-urlencoded
app.use(express.urlencoded({ extended: false }));

// loggea informacion detallada de las peticiones que se hacen al servidor
if (process.env.ENV === "DEV") {
  const morgan = require("morgan");
  app.use(morgan('dev'));
}

// rate-limit
app.use(stdRateLimiter);

// configuracion CORS para que el cliente pueda comunicarse
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// permite recibir, generar y enviar cookies
app.use(cookieParser());

// conexion persistente de MySQL, que se activara solo
// cuando se haga un request, despues procedera a cerrarse
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

// implementacion de las routes
app.use("/", mainRoute);
app.use("/empresas", empresasRoute);
app.use("/categorias", categoriasRoute);
app.use("/preguntas", preguntasRoute);
app.use("/encuestas", encuestaRoute);
app.use("/respuestas", respuestasRoute);
app.use("/latest", latestRoute);
app.use("/usuarios", userRoute);
app.use("/resultados", resultadosRoute);

// route 404
app.all("*", (req, res) =>
  res.status(404).json({
    data: [],
  })
);

// comienza la aplicacion
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening on port ${process.env.PORT || 8080}...`);
});
