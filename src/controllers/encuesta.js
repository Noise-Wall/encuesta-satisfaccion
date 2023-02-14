const controller = {};
const { query, queryRedirect } = require("./query");

controller.list = (req, res) => {
  const query1 = query(req, res, "SELECT * FROM Pregunta WHERE enEncuesta != 1", "");
  const query2 = query(
    req,
    res,
    "SELECT * FROM Pregunta INNER JOIN Categoria on Pregunta.idCategoria = Categoria.idCategoria WHERE enEncuesta = 1",
    ""
  );
  Promise.all([query1, query2]).then((data) =>
    res.status(200).render("encuesta", {
      data: data[0],
      data2: data[1],
      form: {
        action: "/encuesta/agregar",
        method: "post",
        tituloText: "Agregar preguntas",
        buttonText: "Agregar pregunta",
      },
    })
  );
};

controller.add = (req, res) =>
  queryRedirect(
    req,
    res,
    "UPDATE Pregunta SET enEncuesta = 1 WHERE idPregunta = ?",
    [req.body.idPregunta],
    "/encuesta"
  );

controller.remove = (req, res) =>
  queryRedirect(req, res, "UPDATE Pregunta SET enEncuesta = 0 WHERE idPregunta = ?", [req.params.id], "/encuesta");

module.exports = controller;
