const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Empresa
controller.get = (req, res) => {
  const sql = "SELECT * FROM Empresa";
  const queryAll = query(req, res, sql, "");
  Promise.all([queryAll])
    .then((data) => {
      res.json({
        Empresa: data[0],
      });
    })
    .catch((e) => res.json(e));
};

// metodo HTTP POST para insertar valores en Empresa
controller.insert = (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Empresa SET ?";
  const queryInsert = query(req, res, sql, body);

  Promise.all([queryInsert])
    .then(() => {
      res.json({
        Upload: "success",
      });
    })
    .catch((e) => res.json(e));
};

// metodo HTTP GET para una sola entrada en Empresa
controller.getSingle = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Empresa WHERE idEmpresa = ?";
  const querySingle = query(req, res, sql, id);
  Promise.all([querySingle])
    .then((data) => {
      res.json({
        Empresa: data[0],
      });
    })
    .catch((e) => res.json(e));
};

// metodo HTTP GET para obtener la id de la ultima entrada de Categoria
controller.getLatest = (req, res) => {
  const sql = "SELECT * FROM Empresa";
  const query = query(req, res, sql, "");
  Promise.all([query])
    .then((data) => {
      res.json({
        Empresa: data[0],
      });
    })
    .catch((e) => res.json(e));
};

// metodo HTTP PATCH para actualizar una entrada en Empresa
controller.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const sql = "UPDATE Empresa SET ? WHERE idEmpresa = ?";
  const queryUpdate = query(req, res, sql, [body, id]);
  Promise.all([queryUpdate])
    .then(() => {
      res.json({
        Update: "success",
      });
    })
    .catch((e) => res.json(e));
};

// metodo HTTP DELETE para borrar una entrada en Empresa
controller.delete = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Empresa WHERE idEmpresa = ?";
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
