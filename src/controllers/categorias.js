const categorias = {};
const { query, queryRedirect } = require("./query");

categorias.list = (req, res) =>
  Promise.all([query(req, res, "SELECT * FROM Categoria", "")]).then((data) => {
    res.render("categorias", {
      data: data[0],
      form: {
        action: "/categorias",
        method: "post",
        buttonText: "Agregar categoría",
        tituloText: "Agregar categorías",
        inEditMode: false,
      },
    });
  });

categorias.add = (req, res) =>
  queryRedirect(
    req,
    res,
    "INSERT INTO Categoria SET ?",
    req.body,
    "/categorias"
  );

categorias.edit = (req, res) => {
  const query1 = query(
    req,
    res,
    "SELECT * FROM Categoria WHERE idCategoria = ?",
    [req.params.id]
  );
  Promise.all([query1]).then((data) => {
    // error catching si no existe el recurso
    if (data[0].length < 1)
      return res.status(404).render("404")
    res.render("categorias", {
      data: data[0],
      form: {
        action: "/categorias/editar",
        method: "post",
        buttonText: "Actualizar categoría",
        tituloText: "Modificar categoría",
        inEditMode: true,
      },
    });
  })
};

categorias.update = (req, res) => {
  const params = [
    { contenidoCategoria: req.body.contenidoCategoria },
    req.body.id,
  ];
  queryRedirect(
    req,
    res,
    "UPDATE Categoria SET ? WHERE idCategoria=?",
    params,
    "/categorias"
  );
};

categorias.delete = (req, res) =>
  queryRedirect(
    req,
    res,
    "DELETE FROM Categoria WHERE idCategoria = ?",
    [req.params.id],
    "/categorias"
  );

module.exports = categorias;
