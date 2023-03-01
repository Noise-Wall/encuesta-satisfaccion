const controller = {}
const { query } = require('./query')

// metodo HTTP GET para todos los valores en QA
controller.get = (req, res) => {
    const sql = "SELECT * FROM QA";
    const queryAll = query(req, res, sql, "");
    Promise.all([queryAll]).then((data) => {
      res.json({
        QA: data[0],
      });
    });
  };
  // metodo HTTP POST para insertar valores en QA
  controller.insert = (req, res) => {
    const body = req.body;
    const sql = "INSERT INTO QA SET ?";
    const queryInsert = query(req, res, sql, body);
    Promise.all([queryInsert]).then(() => {
      res.json({
        Upload: "success",
      });
    });
  };
  // metodo HTTP GET para una sola entrada en QA
  controller.getSingle = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM QA WHERE idQA = ?";
    const querySingle = query(req, res, sql, id);
    Promise.all([querySingle]).then((data) => {
      res.json({
        Categoria: data[0],
      });
    });
  };
  // metodo HTTP PATCH para actualizar una entrada en QA
  controller.update = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const sql = "UPDATE QA SET ? WHERE idQA = ?";
    const queryUpdate = query(req, res, sql, [body, id]);
    Promise.all([queryUpdate]).then(() => {
      res.json({
        Update: "success",
      });
    });
  };
  // metodo HTTP DELETE para borrar una entrada en QA
  controller.delete = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM QA WHERE idQA = ?";
    const queryDelete = query(req, res, sql, id);
    Promise.all([queryDelete]).then(() => {
      res.json({
        Delete: "success",
      });
    });
  };
  

module.exports = controller