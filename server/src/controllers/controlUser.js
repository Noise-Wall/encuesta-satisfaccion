require("dotenv").config();
const bcrypt = require("bcrypt");
const { query } = require("./query");
const { generateAccessToken } = require("./auth");

const controller = {};
const salt = process.env.SALT;

controller.get = async (req, res) => {
  const page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : null;
  let sql = "SELECT idUsuario, nombreUsuario FROM Usuarios";
  
  if (req.query.count === 'yes') sql = sql.replace("SELECT *", "SELECT COUNT(*) AS count");
  else if (page !== null) sql += ` LIMIT ${page}, 10`;

  await query(req, res, sql)
    .then((data) => res.json({ Usuarios: data }))
    .catch((e) => res.status(500).json(e));
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
  await query(req, res, sql, user)
    .then(() => res.status(201).json({ Upload: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
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
    .catch((e) => console.log(e));
};

controller.validate = async (req, res) => {
  if (res.headerSent) return;
  await validate(req, res)
    .then((result) => {
      if (result.comparison === true) return res.status(202).json(result);
      else return res.status(401).json(result);
    })
    .catch((e) => {
      return res.status(401).json(e);
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
  await query(req, res, sql, id)
    .then((data) => res.json({ Usuarios: data[0] }))
    .catch((e) => res.status(500).json(e));
};

controller.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (req.body.contrasena)
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, salt);
  const sql = "UPDATE Usuarios SET ? WHERE idUsuario = ?";
  await query(req, res, sql, [body, id])
    .then(() => res.json({ Update: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
};
controller.delete = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Usuarios WHERE idUsuario = ?";
  queryDelete = await query(req, res, sql, id)
    .then(() => res.json({ Delete: "Operación exitosa." }))
    .catch((e) => res.status(500).json(e));
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
    })
    .then(async () => {
      try {
        comparison = await bcrypt.compare(
          req.body.contrasena,
          querySingle.contrasena
        );
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    })
    .catch((e) => {
      return { message: e.message };
    });

  return {
    comparison: comparison,
    user: querySingle.nombreUsuario,
  };
}

module.exports = controller;
