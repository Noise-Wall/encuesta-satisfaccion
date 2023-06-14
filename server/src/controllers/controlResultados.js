const controller = {};
const { generarXLSX } = require("./file/format-xlsx");
const { query } = require("./query");
const { merge } = require("lodash");
const { join } = require("path");
const { access, unlinkSync, constants } = require("fs");

function getFormatDate(date) {
  const newDate = new Date(date);
  const month =
    newDate.getMonth() < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

  return newDate.getFullYear() + "-" + month + "-" + day;
}

controller.export = async (req, res) => {
  const year =
    !isNaN(req.params.year) && req.params.year > 1900 && req.params.year < 2100
      ? req.params.year
      : null;

  const preguntas = await query(
    req,
    res,
    "SELECT contenidoPregunta FROM Pregunta WHERE deshabilitada = 1 ORDER BY idCategoria"
  );
  const respuestas = await query(
    req,
    res,
    "SELECT Respuesta.valor, Pregunta.idPregunta, Encuesta.idEncuesta, Encuesta.fecha FROM Pregunta INNER JOIN Respuesta ON Respuesta.idPregunta = Pregunta.idPregunta INNER JOIN Encuesta ON Encuesta.idEncuesta = Respuesta.idEncuesta WHERE Encuesta.fecha >= ? AND Encuesta.fecha < ? ORDER BY Encuesta.fecha, Pregunta.idCategoria, Pregunta.idPregunta",
    [`${year}-01-01`, `${parseInt(year) + 1}-01-01`]
  );

  const respuestasArr = Object.values(respuestas)
    .map((respuesta) => ({
      [respuesta.idEncuesta]: [
        { [respuesta.idPregunta]: respuesta.valor },
        { fecha: getFormatDate(respuesta.fecha) },
      ],
    }))
    .reduce((anterior, respuesta) => merge(anterior, respuesta));

  const encuesta = await generarXLSX({
    year: year,
    preguntas: preguntas,
    respuestas: respuestasArr,
  });
  const filename = join(__dirname, "../../encuesta.xlsx");
  access(filename, constants.F_OK, (err) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Hubo un error al intentar enviar archivo." });
    } else {
      res.download(filename, "encuesta.xlsx", (err) => {
        if (err) console.log(err);
        else {
          console.log("Sent ", filename);
          unlinkSync(filename);
          unlinkSync(join(__dirname, "../../template.xlsx"));
        }
      });
    }
  });
};
// metodo HTTP GET para obtener todas las respuestas que ha tenido una pregunta en un tiempo determinado.
controller.data = async (req, res) => {
  const year = !isNaN(req.params.year) ? req.params.year : null;
  const cuarto = !isNaN(req.params.cuarto)
    ? parseInt(req.params.cuarto) * 3 - 2
    : null;

  let sql =
    // "SELECT Respuesta.valor, Encuesta.fecha FROM Pregunta INNER JOIN Respuesta ON Respuesta.idPregunta = Pregunta.idPregunta INNER JOIN Encuesta ON Encuesta.idEncuesta = Respuesta.idEncuesta WHERE Pregunta.idPregunta = ?";
    "SELECT Respuesta.valor, Pregunta.idPregunta, Encuesta.idEncuesta, Encuesta.fecha FROM Pregunta INNER JOIN Respuesta ON Respuesta.idPregunta = Pregunta.idPregunta INNER JOIN Encuesta ON Encuesta.idEncuesta = Respuesta.idEncuesta WHERE Encuesta.fecha >= ? AND Encuesta.fecha < ? ORDER BY Encuesta.fecha, Pregunta.idCategoria, Pregunta.idPregunta";

  let inicio,
    fin = "";

  if (!year) {
    return res
      .status(400)
      .json({ message: "No se puede enviar datos sin especificar el año." });
  }
  inicio = `${year}-01-01`;
  fin = `${parseInt(year) + 1}-01-01`;
  if (cuarto && cuarto >= 1 && cuarto <= 10) {
    console.log("yes");
    inicio = `${year}-${cuarto > 9 ? cuarto : "0" + cuarto}-01`;
    if (cuarto + 3 <= 12)
      fin = `${year}-${cuarto + 3 > 9 ? cuarto + 3 : "0" + (cuarto + 3)}-01`;
  }

  console.log(`inicio ${inicio}, fin ${fin}`);

  const respuestas = await query(req, res, sql, [inicio, fin])

  if (respuestas.length < 1) return res.status(404).json({message: "Este año no tiene ninguna encuesta."})

  const respuestasArr = Object.values(respuestas)
    .map((respuesta) => ({
      [respuesta.idEncuesta]: [
        { [respuesta.idPregunta]: respuesta.valor },
        { fecha: getFormatDate(respuesta.fecha) },
      ],
    }))
    .reduce((anterior, respuesta) => merge(anterior, respuesta));

  res.json({ Data: respuestasArr })
};

module.exports = controller;
