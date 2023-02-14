const controller = {};
const { query, queryRedirect } = require("./query");

controller.form = (req, res) => {
  const query1 = query(
    req,
    res,
    "SELECT * FROM Pregunta INNER JOIN Categoria on Pregunta.idCategoria = Categoria.idCategoria WHERE enEncuesta = 1"
  );
  Promise.all([query1]).then((data) => {
    res.status(200).render("responder", {
      data: data[0],
    });
  });
};

module.exports = controller;
