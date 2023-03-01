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

module.exports = controller