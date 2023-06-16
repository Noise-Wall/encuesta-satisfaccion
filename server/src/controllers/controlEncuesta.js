const controller = {};
const { unlinkSync } = require('fs')
const { join } = require("path");
const { query } = require("./query");
const { formatPDF, generarPDF } = require("./file/format-pdf");

// metodo HTTP GET para todos los valores en Encuesta, con opcion de paginacion
controller.get = async (req, res) => {
  const page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : null;
  let sql = "SELECT * FROM Encuesta";

  if (req.query.count === "yes")
    sql = sql.replace("SELECT *", "SELECT COUNT(*) AS count");
  else if (page !== null) sql += ` LIMIT ${page}, 10`;

  console.log(sql);

  await query(req, res, sql)
    .then((data) => res.json({ Encuesta: data }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

// metodo HTTP POST para insertar valores en Encuesta
controller.insert = async (req, res) => {
  const body = req.body;
  const sql = "INSERT INTO Encuesta SET ?";

  await query(req, res, sql, body)
    .then(() => res.json({ Upload: "Operación exitosa." }))
    .catch((err) => res.status(500).json(err));
};

// metodo HTTP GET para una sola entrada en Encuesta
controller.getSingle = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Encuesta WHERE idEncuesta = ?";

  await query(req, res, sql, id)
    .then((data) => res.json({ Encuesta: data[0] }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

// retorna informacion en formato para su uso en exportacion
controller.getEncuestaData = async (req, res) => {
  const id = req.params.id;
  const sql =
    "SELECT Empresa.nombreEmpresa, Empresa.nombreContacto, Empresa.correo, Encuesta.fecha, Encuesta.comentarios FROM Encuesta INNER JOIN Empresa on Empresa.idEmpresa = Encuesta.idEmpresa WHERE Encuesta.idEncuesta = ?";

  await query(req, res, sql, id)
    .then((data) => {
      res.json({ Encuesta: data[0] });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

controller.exportarPDF = async (req, res) => {
  const id = req.params.id;
  const sqlDatosEncuesta = await query(
    req,
    res,
    "SELECT Empresa.nombreEmpresa, Empresa.nombreContacto, Empresa.correo, Encuesta.fecha, Encuesta.comentarios FROM Encuesta INNER JOIN Empresa on Empresa.idEmpresa = Encuesta.idEmpresa WHERE Encuesta.idEncuesta = ?",
    id
  );
  const sqlRespuestas = await query(
    req,
    res,
    "SELECT Respuesta.valor,Pregunta.contenidoPregunta, Categoria.contenidoCategoria FROM Respuesta INNER JOIN Pregunta on Respuesta.idPregunta = Pregunta.idPregunta INNER JOIN Categoria on Pregunta.idCategoria = Categoria.idCategoria WHERE Respuesta.idEncuesta = ? ORDER BY Categoria.idCategoria, Pregunta.idPregunta",
    id
  );

  generarPDF(sqlDatosEncuesta[0], sqlRespuestas)

  const fileName = join(__dirname, "../../resultados.pdf");
  
  res.status(201).download(fileName, 'result.pdf', function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent: ", fileName);
      unlinkSync(fileName)
    }
  });
};

// metodo HTTP PATCH para actualizar una entrada en Encuesta
controller.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const sql = "UPDATE Encuesta SET ? WHERE idEncuesta = ?";

  await query(req, res, sql, [body, id])
    .then(() => res.json({ Update: "Operación exitosa." }))
    .catch((err) => res.status(500).json(err));
};

// metodo HTTP DELETE para borrar una entrada en Encuesta
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Encuesta WHERE idEncuesta = ?";

  await query(req, res, sql, id)
    .then(() => res.json({ Delete: "Operación exitosa." }))
    .catch((err) => res.status(500).json(err));
};

module.exports = controller;
