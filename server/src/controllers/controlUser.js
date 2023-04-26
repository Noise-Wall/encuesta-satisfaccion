require("dotenv").config();
const bcrypt = require("bcrypt");
const { query } = require("./query");
const { generateAccessToken } = require("./auth");

const controller = {};
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
  const contrasena = bcrypt.hashSync(req.body.contrasena, salt);
  const user = {
    nombreUsuario: req.body.nombreUsuario,
    contrasena: contrasena,
  };
  const sql = "INSERT INTO Usuarios SET ?";
  queryInsert = await query(req, res, sql, user)
    .then(() => res.status(201).json({ message: "Operación exitosa." }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

controller.login = async (req, res) => {
  const nombreUsuario = req.body.nombreUsuario || null;
  const sqlSingle = "SELECT * FROM Usuarios WHERE nombreUsuario = ?";
  let querySingle = {};
  if (nombreUsuario === null)
    return res
      .status(400)
      .json({ message: "No se introdujo un nombre de usuario válido." });

  await query(req, res, sqlSingle, nombreUsuario)
    .then((result) => {
      querySingle.nombreUsuario = result[0].nombreUsuario || null;
      querySingle.contrasena = result[0].contrasena || null;
      if (querySingle.nombreUsuario === null)
        return res
          .status(400)
          .json({ message: "No se introdujo un nombre de usuario válido." });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });

  let comparison = await bcrypt.compare(
    req.body.contrasena,
    querySingle.contrasena
  );

  if (comparison) {
    const token = generateAccessToken({
      nombreUsuario: querySingle.nombreUsuario,
    });
    res.cookie("token", token, {
      domain: "laquin-encuesta-rest.onrender.com",
      maxAge: 3600000,
      sameSite: false,
      secure: true,
    });

    res.status(202).json({
      message: "Inicio de sesión exitoso.",
    });
  } else {
    res.status(401).json({ message: "Error: contraseña inválida." });
  }
};

controller.logout = (req, res) => {
  const token = req.cookies.token || null;
  if (token === null)
    return res
      .status(400)
      .json({ message: "No se encontró una sesión para cerrar." });
  res.clearCookie("token");
  res.status(200).json({ message: "Sesión cerrada." });
};

controller.getSingle = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Usuarios WHERE idUsuario = ?";
  queryGetSingle = await query(req, res, sql, id)
    .then((data) => res.json({ Usuarios: data[0] }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

controller.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const sql = "UPDATE Usuarios SET ? WHERE idUsuario = ?";
  queryUpdate = await query(req, res, sql, [body, id])
    .then(() => res.json({ message: "Operación exitosa." }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Usuarios WHERE idUsuario = ?";
  queryDelete = await query(req, res, sql, id)
    .then(() => res.json({ message: "Operación exitosa." }))
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports = controller;
