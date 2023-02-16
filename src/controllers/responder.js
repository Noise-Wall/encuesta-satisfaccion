const controller = {};
const { query, queryRedirect } = require("./query");

controller.info = (req, res) => {
  res.render("responderInfo");
};

controller.datosUsuario = (req, res) => {
  const query1 = query(req, res, "SELECT * FROM Empresa", "");
  Promise.all([query1]).then((data) => {
    res.status(200).render("responderUsuario", {
      data: data[0],
      form: {
        action: '/responder/datos/subir',
        method: 'post',
      }
    })
  });
};

controller.subirUsuario = (req,res) => {
  queryRedirect(req,res,"INSERT INTO Empresa SET ?", [req.body], '/responder/encuesta')
}

controller.form = (req, res) => {
  const query1 = query(
    req,
    res,
    "SELECT * FROM Pregunta INNER JOIN Categoria on Pregunta.idCategoria = Categoria.idCategoria WHERE enEncuesta = 1"
  );
  const query2 = query(req,res, "SELECT * FROM Empresa WHERE idEmpresa = ?", [req.params.id]);
  Promise.all([query1,query2]).then((data) => {
    res.status(200).render("responder", {
      data: data[0],
    });
  });
};

module.exports = controller;
