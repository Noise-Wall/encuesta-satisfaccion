require("dotenv").config();
const controller = {};
const bcrypt = require("bcrypt");
const { query } = require("./query");

const salt = process.env.SALT;

controller.get = async (req, res) => {
  const sql = "SELECT * FROM Usuarios";
  queryAll = await query(req, res, sql, "")
    .then((data) => res.json({ Usuarios: data }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

controller.insert = async (req, res) => {
  // toma los valores introducidos en el metodo post y
  // encripta la contraseña con un hash de 10
  console.log('start')
  const contrasena = bcrypt.hashSync(req.body.contrasena, salt)
  const user = {
    nombreUsuario: req.body.nombreUsuario,
    contrasena: contrasena,
  };
  const sql = "INSERT INTO Usuarios SET ?";
  console.log(user)
  console.log(sql)
  queryInsert = await query(req, res, sql, user)
    .then(() => res.json({ Upload: "success" }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

controller.login = async (req, res) => {
  const nombreUsuario = req.body.nombreUsuario;
  const sqlSingle = "SELECT * FROM Usuarios WHERE nombreUsuario = ?";
  let querySingle = {};
  await query(req, res, sqlSingle, nombreUsuario)
    .then((result) => {
      querySingle.nombreUsuario = result[0].nombreUsuario;
      querySingle.contrasena = result[0].contrasena;
      if (querySingle.nombreUsuario == null || req.body.contrasena == null)
        return res.status(400).json({ message: "no" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });

  console.log(querySingle.contrasena);
  console.log(bcrypt.hashSync(req.body.contrasena, salt));

  let comparison = await bcrypt.compare(
    req.body.contrasena,
    querySingle.contrasena
  );
  console.log(comparison);

  if (comparison) {
    res.status(202).json({ message: "success" });
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

controller.getSingle = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Usuarios WHERE idUsuario = ?";
  queryGetSingle = await query(req, res, sql, id)
    .then((data) => res.json({ Usuarios: data[0] }))
    .catch((error) => {
      return res.status(500).json(err);
    });
};

controller.update = (req, res) => {
  res.json({ message: "true" });
};
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Usuarios WHERE idUsuario = ?";
  queryDelete = await query(req, res, sql, id)
    .then((data) =>
      res.json({
        Delete: "success",
      })
    )
    .catch((error) => {
      return res.status(500).json(err);
    });
};

module.exports = controller;
