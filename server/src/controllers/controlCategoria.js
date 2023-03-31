const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Categoria
controller.get = (req, res) => {
  const sql = "SELECT * FROM Categoria";
  const queryAll = query(req, res, sql, "");
  Promise.all([queryAll])
    .then((data) => {
      res.json({
        Categoria: data[0],
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP POST para insertar valores en Categoria
controller.insert = (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Categoria SET ?";
  const queryInsert = query(req, res, sql, body);
  Promise.all([queryInsert])
    .then(() => {
      res.json({
        Upload: "success",
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP GET para una sola entrada en Categoria
controller.getSingle = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Categoria WHERE idCategoria = ?";
  const querySingle = query(req, res, sql, id);
  Promise.all([querySingle])
    .then((data) => {
      res.json({
        Categoria: data[0],
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP PATCH para actualizar una entrada en Categoria
controller.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const sql = "UPDATE Categoria SET ? WHERE idCategoria = ?";
  const queryUpdate = query(req, res, sql, [body, id]);
  Promise.all([queryUpdate])
    .then(() => {
      res.json({
        Update: "success",
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP DELETE para borrar una entrada en Categoria
controller.delete = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Categoria WHERE idCategoria = ?";
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
