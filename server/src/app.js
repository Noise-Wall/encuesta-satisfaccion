require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// test de dynamodb
// como MongoDB, se incorporara la base de datos dentro del archivo de los controladores
// 
// const CyclicDb = require("@cyclic.sh/dynamodb")
// const db = CyclicDb("zany-duck-bathing-suitCyclicDB")
// const empresa = db.collection("empresa")
// console.log(empresa)

// const run = async function() {
//   let testEmpresa = await empresa.set("testEmpresa2", {
//     nombre: "Empresa de prueba 2",
//     contacto: "Contacto de Prueba 2",
//     correo: "test2@empresa2.com"
//   })
//   let item = await empresa.list()
  
//   console.log(item)
// }
// run().catch((e)=>console.log(e.message))

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
const latestRoute = require("./routes/latest")

// settings
app.set("port", process.env.PORT || 8080);
app.use(express.json());
// otorga acceso al front end a hacer requests del API
app.use(
  cors({
    origin: `http://${process.env.CLIENTHOST}:${process.env.CLIENTPORT}`,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);


// rutas
app.use("/", mainRoute);
app.use("/empresas", empresasRoute);
app.use("/categorias", categoriasRoute);
app.use("/preguntas", preguntasRoute);
app.use("/encuestas", encuestaRoute);
app.use("/respuestas", respuestasRoute);
app.use("/latest", latestRoute);
// ruta 404
app.all("*", (req, res) =>
  res.status(404).json({
    data: [],
  })
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is listening on port ${process.env.PORT || 8080}...`);
});
