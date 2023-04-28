const controller = {};
const { query } = require("./query");

controller.all = (req, res) => {
  console.log(req.hostname);
  const queryEmpresa = query(req, res, "SELECT * FROM Empresa", "");
  const queryCategorias = query(req, res, "SELECT * FROM Categoria", "");
  const queryPregunta = query(req, res, "SELECT * FROM Pregunta", "");
  const queryEncuesta = query(req, res, "SELECT * FROM Encuesta", "");
  const queryRespuesta = query(req, res, "SELECT * FROM Respuesta", "");

  Promise.all([
    queryEmpresa,
    queryCategorias,
    queryPregunta,
    queryEncuesta,
    queryRespuesta,
  ])
    .then((data) => {
      res.json({
        Empresa: data[0],
        Categoria: data[1],
        Pregunta: data[2],
        Encuesta: data[3],
        Respuesta: data[4],
        Resultados: data[5],
      });
    })
    .catch((e) => res.json(e));
};

module.exports = controller;
