const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Respuesta
controller.get = async (req, res) => {
  const page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : null;
  let sql = "SELECT * FROM Respuesta";
  
  if (req.query.count === 'yes') sql = sql.replace("SELECT *", "SELECT COUNT(*) AS count");
  else if (page !== null) sql += ` LIMIT ${page}, 10`;

  await query(req, res, sql)
    .then((data) => res.json({ Respuesta: data }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP POST para insertar valores en Respuesta
controller.insert = async (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Respuesta SET ?";
  await query(req, res, sql, body)
    .then(() => res.json({ Upload: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP GET para una sola entrada en Respuesta
controller.getSingle = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Respuesta WHERE idRespuesta = ?";
  await query(req, res, sql, id)
    .then((data) => res.json({ Respuesta: data[0] }))
    .catch((e) => res.status(500).json(e));
};
// colecta las respuestas en una encuesta determinada
controller.getByEncuesta = async (req, res) => {
  let id = req.params.id;
  let sql =
    "SELECT Respuesta.valor,Pregunta.contenidoPregunta, Categoria.contenidoCategoria FROM Respuesta INNER JOIN Pregunta on Respuesta.idPregunta = Pregunta.idPregunta INNER JOIN Categoria on Pregunta.idCategoria = Categoria.idCategoria WHERE Respuesta.idEncuesta = ? ORDER BY Categoria.idCategoria, Pregunta.idPregunta";
  await query(req, res, sql, id)
    .then((data) => res.json({ Respuesta: data }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP PATCH para actualizar una entrada en Respuesta
controller.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const sql = "UPDATE Respuesta SET ? WHERE idRespuesta = ?";
  await query(req, res, sql, [body, id])
    .then(() => res.json({ Update: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP DELETE para borrar una entrada en Respuesta
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Respuesta WHERE idRespuesta = ?";
  await query(req, res, sql, id)
    .then(() => res.json({ Delete: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
// borra las respuestas en una encuesta determinada
controller.deleteByEncuesta = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Respuesta WHERE idEncuesta = ?";
  await query(req, res, sql, id)
    .then(() => res.json({ Delete: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};

module.exports = controller;
