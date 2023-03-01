const controller = {}
const { query } = require('./query')

// metodo HTTP GET para todos los valores en Encuesta
controller.get = (req, res) => {
    const sql = "SELECT * FROM Encuesta";
    const queryAll = query(req, res, sql, "");
    Promise.all([queryAll]).then((data) => {
      res.json({
        Encuesta: data[0],
      });
    });
  };
  // metodo HTTP POST para insertar valores en Encuesta
  controller.insert = (req, res) => {
    const body = req.body;
    const sql = "INSERT INTO Encuesta SET ?";
    const queryInsert = query(req, res, sql, body);
    Promise.all([queryInsert]).then(() => {
      res.json({
        Upload: "success",
      });
    });
  };
  // metodo HTTP GET para una sola entrada en Encuesta
  controller.getSingle = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Encuesta WHERE idEncuesta = ?";
    const querySingle = query(req, res, sql, id);
    Promise.all([querySingle]).then((data) => {
      res.json({
        Categoria: data[0],
      });
    });
  };
  // metodo HTTP PATCH para actualizar una entrada en Encuesta
  controller.update = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const sql = "UPDATE Encuesta SET ? WHERE idEncuesta = ?";
    const queryUpdate = query(req, res, sql, [body, id]);
    Promise.all([queryUpdate]).then(() => {
      res.json({
        Update: "success",
      });
    });
  };
  // metodo HTTP DELETE para borrar una entrada en Encuesta
  controller.delete = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM Encuesta WHERE idEncuesta = ?";
    const queryDelete = query(req, res, sql, id);
    Promise.all([queryDelete]).then(() => {
      res.json({
        Delete: "success",
      });
    });
  };
  

module.exports = controller