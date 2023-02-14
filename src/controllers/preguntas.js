const controller = {};
const { query, queryRedirect } = require("./query");

controller.list = (req, res) => {
  const query1 = query(
    req,
    res,
    "SELECT * FROM Pregunta INNER JOIN Categoria on Pregunta.idCategoria = Categoria.idCategoria",
    ""
  );
  const query2 = query(req, res, "SELECT * FROM Categoria", "");
  Promise.all([query1, query2]).then((data) =>
    res.render("preguntas", {
      // Resultados de las queries
      data: data[0],
      data2: data[1],
      // Variables a insertarse de manera dinamica a la pagina
      form: {
        action: "/preguntas",
        method: "post",
        tituloText: "Agregar preguntas",
        buttonText: "Agregar pregunta",
      },
    })
  );
  //   });
  // });
};

controller.add = (req, res) =>
  queryRedirect(
    req,
    res,
    "INSERT INTO Pregunta SET ?",
    [req.body],
    "/preguntas"
  );

controller.edit = (req, res) => {
  const query1 = query(
    req,
    res,
    "SELECT * FROM Pregunta WHERE idPregunta = ?",
    req.params.idPregunta
  );
  const query2 = query(req, res, "SELECT * FROM Categoria", "");

  Promise.all([query1, query2]).then((data) => {
    // error catching si no existe el recurso
    if (data[0].length < 1) return res.status(404).render("404");
    res.render("preguntas", {
      data: data[0],
      data2: data[1],
      form: {
        action: "/preguntas/editar/",
        method: "post",
        buttonText: "Actualizar pregunta",
        tituloText: "Modificar preguntas",
        inEditMode: true
      },
    });
  });
};

controller.update = (req, res) => {
  const params = [
    {
      contenidoPregunta: req.body.contenidoPregunta,
      idCategoria: req.body.idCategoria,
    },
    req.body.id,
  ];
  queryRedirect(
    req,
    res,
    "UPDATE Pregunta SET ? WHERE idPregunta=?",
    params,
    "/preguntas"
  );
};

module.exports = controller;
