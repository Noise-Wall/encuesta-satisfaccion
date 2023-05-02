require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKENSECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res) {
  const token = req.cookies.token;
  if (token == null)
    return res.status(401).json({ message: "Acceso restringido" });

  jwt.verify(token, process.env.TOKENSECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Acceso prohibido" });
    }
    return res.status(202).json({ message: "Aceptado" });
  });
}

function headerAuthorization(req, res, next) {
  let xFrom =
    Object.entries(req.headers).filter((e) => e.includes("x-from"))[0] || [];
  console.log(xFrom);
  const cookie = req.cookies.clientOrigin;

  if (xFrom.includes(process.env.DOMAIN) && !cookie) {
    res.cookie("clientOrigin", generateAccessToken({ "x-from": xFrom }), {
      domain: process.env.DOMAIN,
      maxAge: 3600000,
      SameSite: false,
      secure: true,
    });
  } else if (xFrom.includes(process.env.DOMAIN) && cookie) {
    jwt.verify(cookie, process.env.TOKENSECRET, (err, {}) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Acceso prohibido" });
      }
    });
  } else {
    console.log("Error de validación: el cliente de origen es inválido");
    return res.status(401).json({ message: "Acceso denegado" });
  }
  next();
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  headerAuthorization,
};
