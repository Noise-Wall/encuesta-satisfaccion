const controller = {};
const { generarXLSX } = require("./file/format-xlsx");
const { query } = require("./query");
const { merge } = require("lodash");

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

  generarXLSX({ year: year, preguntas: preguntas, respuestas: respuestasArr })
    .then(() => {
      const fileName = `encuestas-${year}.xlsx`
      res.attachment(fileName);
      console.log("Sent: ", fileName);
      res.json({
        // export: true,
        // year: year,
        // preguntas: preguntas,
        // respuestas: respuestasArr,
        sent: fileName,
      });
    })
    .catch((err) => res.json({ message: err }));
};

module.exports = controller;
