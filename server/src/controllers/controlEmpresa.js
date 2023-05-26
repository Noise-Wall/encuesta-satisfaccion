const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Empresa
controller.get = async (req, res) => {
  const page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : null;
  let sql = "SELECT * FROM Empresa";

  if (req.query.count === 'yes') sql = sql.replace("SELECT *", "SELECT COUNT(*) AS count");
  else if (page !== null) sql += ` LIMIT ${page}, 10`;

  await query(req, res, sql)
    .then((data) => res.json({ Empresa: data }))
    .catch((e) => res.status(500).json(e));
};

// metodo HTTP POST para insertar valores en Empresa
controller.insert = async (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Empresa SET ?";
  await query(req, res, sql, body)
    .then(() => res.json({ Upload: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};

// metodo HTTP GET para una sola entrada en Empresa
controller.getSingle = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Empresa WHERE idEmpresa = ?";
  await query(req, res, sql, id)
    .then((data) => res.json({ Empresa: data[0] }))
    .catch((e) => res.status(500).json(e));
};

// metodo HTTP GET para obtener la id de la ultima entrada de Categoria
controller.getLatest = async (req, res) => {
  const sql = "SELECT * FROM Empresa";
  await query(req, res, sql)
    .then((data) => res.json({ Empresa: data[0] }))
    .catch((e) => res.status(500).json(e));
};

// metodo HTTP PATCH para actualizar una entrada en Empresa
controller.update = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const sql = "UPDATE Empresa SET ? WHERE idEmpresa = ?";
  await query(req, res, sql, [body, id])
    .then(() => res.json({ Update: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};

// metodo HTTP DELETE para borrar una entrada en Empresa
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Empresa WHERE idEmpresa = ?";

  await query(req, res, sql, id)
    .then(() => res.json({ Delete: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};

module.exports = controller;
