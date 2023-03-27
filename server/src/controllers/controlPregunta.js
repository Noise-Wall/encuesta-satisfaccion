const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Pregunta
controller.get = (req, res) => {
  const sql = "SELECT * FROM Pregunta";
  const queryAll = query(req, res, sql, "");
  Promise.all([queryAll]).then((data) => {
    res.json({
      Pregunta: data[0],
    });
  });
};
// metodo HTTP POST para insertar valores en Pregunta
controller.insert = (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Pregunta SET ?";
  const queryInsert = query(req, res, sql, body);
  Promise.all([queryInsert]).then(() => {
    res.json({
      Upload: "success",
    });
  });
};
// metodo HTTP GET para una sola entrada en Pregunta
controller.getSingle = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Pregunta WHERE idPregunta = ?";
  const querySingle = query(req, res, sql, id);
  Promise.all([querySingle]).then((data) => {
    res.json({
      Pregunta: data[0],
    });
  });
};
// metodo HTTP GET con parametros query para obtener todas las preguntas de una categoria que esten habilitadas. cuando no haya query, regresa la concatenacion de ambas tablas.
controller.getByCategoria = (req, res) => {
  let sql =
        "SELECT * FROM Pregunta INNER JOIN Categoria on Pregunta.idCategoria = Categoria.idCategoria WHERE Pregunta.deshabilitada = 1 ORDER BY Categoria.idCategoria";
  const queryByCategoria = query(req, res, sql, '');
  Promise.all([queryByCategoria]).then((data) => {
    res.json(data);
  });
};
// metodo HTTP PATCH para actualizar una entrada en Pregunta
controller.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body)
  const sql = "UPDATE Pregunta SET ? WHERE idPregunta = ?";
  const queryUpdate = query(req, res, sql, [body, id]);
  Promise.all([queryUpdate]).then(() => {
    res.json({
      Update: "success",
    });
  });
};
// metodo HTTP DELETE para borrar una entrada en Pregunta
controller.delete = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Pregunta WHERE idPregunta = ?";
  const queryDelete = query(req, res, sql, id);
  Promise.all([queryDelete]).then(() => {
    res.json({
      Delete: "success",
    });
  });
};

module.exports = controller;
