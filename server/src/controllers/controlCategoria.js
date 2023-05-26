const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Categoria
controller.get = async (req, res) => {
  const page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : null;
  let sql = "SELECT * FROM Categoria";

  if (req.query.count === 'yes') sql = sql.replace("SELECT *", "SELECT COUNT(*) AS count");
  else if (page !== null) sql += ` LIMIT ${page}, 10`;

  await query(req, res, sql)
    .then((data) => res.json({ Categoria: data }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP POST para insertar valores en Categoria
controller.insert = async (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Categoria SET ?";
  await query(req, res, sql, body)
    .then(() => res.status(201).json({ Upload: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP GET para una sola entrada en Categoria
controller.getSingle = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Categoria WHERE idCategoria = ?";
  await query(req, res, sql, id)
    .then((data) => res.json({ Categoria: data[0] }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP PATCH para actualizar una entrada en Categoria
controller.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const sql = "UPDATE Categoria SET ? WHERE idCategoria = ?";
  await query(req, res, sql, [body, id])
    .then(() => res.json({ Update: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
// metodo HTTP DELETE para borrar una entrada en Categoria
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Categoria WHERE idCategoria = ?";
  await query(req, res, sql, id)
    .then(() => res.json({ Delete: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};

module.exports = controller;
