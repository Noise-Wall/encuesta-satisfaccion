require("dotenv").config();
const bcrypt = require("bcrypt");
const { query } = require("./query");
const { generateAccessToken } = require("./auth");

const controller = {};
const salt = process.env.SALT;

controller.get = async (req, res) => {
  const sql = "SELECT idUsuario, nombreUsuario FROM Usuarios";
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
  if (res.headerSent) return;
  await validate(req, res)
    .then((result) => {
      console.log(result.comparison);

      if (result.comparison) {
        const token = generateAccessToken({
          nombreUsuario: result.user,
        });

        res.cookie("token", token, {
          domain: process.env.DOMAIN,
          maxAge: 3600000,
          SameSite: false,
          secure: true,
        });

        return res.status(202).json({
          message: "Inicio de sesión exitoso.",
        });
      } else {
        return res.status(401).json({ message: "Error: contraseña inválida." });
      }
    })
    .catch((err) => console.log(err));
};

controller.validate = async (req, res) => {
  if (res.headerSent) return;
  await validate(req, res)
    .then((result) => {
      if (result.comparison === true) return res.status(202).json(result);
      else return res.status(401).json(result);
    })
    .catch((error) => {
      return res.status(401).json(error);
    });
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
  if (req.body.contrasena)
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, salt);
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

async function validate(req, res) {
  const nombreUsuario = req.body.nombreUsuario || null;
  const sqlSingle = "SELECT * FROM Usuarios WHERE nombreUsuario = ?";
  let querySingle = {};
  let comparison;
  console.log("Intento de login");
  console.log(req.body);
  if (nombreUsuario === null)
    return { message: "No se introdujo un nombre de usuario válido." };

  await query(req, res, sqlSingle, nombreUsuario)
    .then((result) => {
      querySingle.nombreUsuario = result[0].nombreUsuario || null;
      querySingle.contrasena =
        result[0].contrasena == "" ? null : result[0].contrasena;
      if (querySingle.nombreUsuario === null)
        return { message: "No se introdujo un nombre de usuario válido." };
      if (querySingle.contrasena === null)
        return { message: "No se introdujo una contrasena válida." };
    }).then(async () => {
      try {
        comparison = await bcrypt.compare(
          req.body.contrasena,
          querySingle.contrasena
        );
      } catch (err) {
        console.log(`Error: ${err.message}`)
      }
    })
    .catch((err) => {
      return {message: err.message};
    });

  return {
    comparison: comparison,
    user: querySingle.nombreUsuario,
  };
}

module.exports = controller;
