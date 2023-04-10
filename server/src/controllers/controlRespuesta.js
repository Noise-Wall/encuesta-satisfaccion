const controller = {};
const { query } = require("./query");

// metodo HTTP GET para todos los valores en Respuesta
controller.get = (req, res) => {
  const sql = "SELECT * FROM Respuesta";
  const queryAll = query(req, res, sql, "");
  Promise.all([queryAll])
    .then((data) => {
      res.json({
        Respuesta: data[0],
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP POST para insertar valores en Respuesta
controller.insert = (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Respuesta SET ?";
  const queryInsert = query(req, res, sql, body);
  Promise.all([queryInsert])
    .then(() => {
      res.json({
        Upload: "success",
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP GET para una sola entrada en Respuesta
controller.getSingle = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Respuesta WHERE idRespuesta = ?";
  const querySingle = query(req, res, sql, id);
  Promise.all([querySingle])
    .then((data) => {
      res.json({
        Respuesta: data[0],
      });
    })
    .catch((e) => res.json(e));
};
controller.getByEncuesta = (req,res) => {
  let id = req.params.id
  let sql = "SELECT Respuesta.valor,Pregunta.contenidoPregunta FROM Respuesta INNER JOIN Pregunta on Respuesta.idPregunta = Pregunta.idPregunta WHERE Respuesta.idEncuesta = ?"
  const queryByEncuesta = query(req,res,sql,id)
  Promise.all([queryByEncuesta]).then((data)=>{
    res.json({
      Respuesta: data[0],
    })
  }).catch((e) => res.json(e));
}

// metodo HTTP PATCH para actualizar una entrada en Respuesta
controller.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const sql = "UPDATE Respuesta SET ? WHERE idRespuesta = ?";
  const queryUpdate = query(req, res, sql, [body, id]);
  Promise.all([queryUpdate])
    .then(() => {
      res.json({
        Update: "success",
      });
    })
    .catch((e) => res.json(e));
};
// metodo HTTP DELETE para borrar una entrada en Respuesta
controller.delete = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Respuesta WHERE idRespuesta = ?";
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
