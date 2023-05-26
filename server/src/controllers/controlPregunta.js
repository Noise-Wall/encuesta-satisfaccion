const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Pregunta
controller.get = async (req, res) => {
  const page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : null;
  let sql = "SELECT * FROM Pregunta";

  if (req.query.count === 'yes') sql = sql.replace("SELECT *", "SELECT COUNT(*) AS count");
  else if (page !== null) sql += ` LIMIT ${page}, 10`;

  await query(req, res, sql)
    .then((data) => res.json({ Pregunta: data }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP POST para insertar valores en Pregunta
controller.insert = async (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Pregunta SET ?";
  await query(req, res, sql, body)
    .then(() => res.json({ Upload: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP GET para una sola entrada en Pregunta
controller.getSingle = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Pregunta WHERE idPregunta = ?";
  await query(req, res, sql, id)
    .then((data) => res.json({ Pregunta: data[0] }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP GET con parametros query para obtener todas las preguntas de una categoria que esten habilitadas. cuando no haya query, regresa la concatenacion de ambas tablas.
controller.getByCategoria = async (req, res) => {
  let sql =
    "SELECT idPregunta, contenidoPregunta,idCategoria FROM Pregunta WHERE deshabilitada = 1 ORDER BY idCategoria";
  await query(req, res, sql)
    .then((data) => res.json({ Pregunta: data }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP GET para obtener todas las respuestas que ha tenido una pregunta en un tiempo determinado.
controller.getByRespuestas = async (req, res) => {
  const id = req.params.id;
  const year = !isNaN(req.params.year) ? parseInt(req.params.year) : null;
  const cuarto = !isNaN(req.params.cuarto)
    ? parseInt(req.params.cuarto) * 3 - 2
    : null;

  let sql =
    "SELECT Respuesta.valor, Encuesta.fecha FROM Pregunta INNER JOIN Respuesta ON Respuesta.idPregunta = Pregunta.idPregunta INNER JOIN Encuesta ON Encuesta.idEncuesta = Respuesta.idEncuesta WHERE Pregunta.idPregunta = ?";

  let inicio,
    fin = "";

  if (year) {
    sql += " AND Encuesta.fecha >= ? AND Encuesta.fecha < ?";
    inicio = `${year}-01-01`;
    fin = `${year + 1}-01-01`;
    if (cuarto && cuarto >= 1 && cuarto <= 10) {
      console.log("yes");
      inicio = `${year}-${cuarto > 9 ? cuarto : "0" + cuarto}-01`;
      if (cuarto + 3 <= 12)
        fin = `${year}-${cuarto + 3 > 9 ? cuarto + 3 : "0" + (cuarto + 3)}-01`;
    }
  }

  console.log(`inicio ${inicio}, fin ${fin}`);

  await query(req, res, sql, [id, inicio, fin])
    .then((data) => res.json({ Pregunta: data }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP PATCH para actualizar una entrada en Pregunta
controller.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  const sql = "UPDATE Pregunta SET ? WHERE idPregunta = ?";
  await query(req, res, sql, [body, id])
    .then(() => res.json({ Update: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP DELETE para borrar una entrada en Pregunta
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Pregunta WHERE idPregunta = ?";
  await query(req, res, sql, id)
    .then(() => res.json({ Delete: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};

module.exports = controller;
