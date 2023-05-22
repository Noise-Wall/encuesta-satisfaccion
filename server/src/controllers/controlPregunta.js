const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Pregunta
controller.get = (req, res) => {
  const sql = "SELECT * FROM Pregunta";
  const queryAll = query(req, res, sql, "");
  Promise.all([queryAll])
    .then((data) => {
      res.json({
        Pregunta: data[0],
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP POST para insertar valores en Pregunta
controller.insert = (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Pregunta SET ?";
  const queryInsert = query(req, res, sql, body);
  Promise.all([queryInsert])
    .then(() => {
      res.json({
        Upload: "success",
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP GET para una sola entrada en Pregunta
controller.getSingle = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Pregunta WHERE idPregunta = ?";
  const querySingle = query(req, res, sql, id);
  Promise.all([querySingle])
    .then((data) => {
      res.json({
        Pregunta: data[0],
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP GET con parametros query para obtener todas las preguntas de una categoria que esten habilitadas. cuando no haya query, regresa la concatenacion de ambas tablas.
controller.getByCategoria = (req, res) => {
  let sql =
    "SELECT idPregunta, contenidoPregunta,idCategoria FROM Pregunta WHERE deshabilitada = 1 ORDER BY idCategoria";
  const queryByCategoria = query(req, res, sql, "");
  Promise.all([queryByCategoria])
    .then((data) => {
      res.json({
        Pregunta: data[0],
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP GET para obtener todas las respuestas que ha tenido una pregunta en un tiempo determinado.
controller.getByRespuestas = async (req, res) => {
  const id = req.params.id;
  const year = !isNaN(req.params.year) 
    ? parseInt(req.params.year) 
    : null;
  const cuarto = !isNaN(req.params.cuarto)
    ? parseInt(req.params.cuarto) * 3 - 2
    : null;

  let sql =
    "SELECT Respuesta.valor, Encuesta.fecha FROM Pregunta INNER JOIN Respuesta ON Respuesta.idPregunta = Pregunta.idPregunta INNER JOIN Encuesta ON Encuesta.idEncuesta = Respuesta.idEncuesta WHERE Pregunta.idPregunta = ?";

  let inicio = "";
  let fin = "";

  if (year) {
    sql += " AND Encuesta.fecha >= ? AND Encuesta.fecha < ?";
    inicio = `${year}-01-01`;
    fin = `${year + 1}-01-01`;
    if (cuarto && (cuarto >= 1 && cuarto <= 10)) {
      console.log('yes')
      inicio = `${year}-${cuarto > 9 ? cuarto : '0' + cuarto}-01`
      if (cuarto + 3 <= 12) fin = `${year}-${cuarto+3 > 9 ? cuarto + 3 : '0' + (cuarto + 3)}-01`;
    }
  }

  console.log(`inicio ${inicio}, fin ${fin}`);

  await query(req, res, sql, [id, inicio, fin])
    .then((data) => {
      res.json({
        Pregunta: data,
      });
    })
    .catch((e) => res.status(400).json(e));
};
// metodo HTTP PATCH para actualizar una entrada en Pregunta
controller.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  const sql = "UPDATE Pregunta SET ? WHERE idPregunta = ?";
  const queryUpdate = query(req, res, sql, [body, id]);
  Promise.all([queryUpdate])
    .then(() => {
      res.json({
        Update: "success",
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP DELETE para borrar una entrada en Pregunta
controller.delete = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Pregunta WHERE idPregunta = ?";
  const queryDelete = query(req, res, sql, id);
  Promise.all([queryDelete])
    .then(() => {
      res.json({
        Delete: "success",
      });
    })
    .catch((e) => res.json(e));
};

module.exports = controller;
