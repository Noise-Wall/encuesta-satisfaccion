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

    res.status(202).json({ message: "Aceptado" });
  });
}

function hostnameAuthorization(req, res, next) {
  console.log(
    `${req.protocol.toUpperCase()} request from ${req.hostname}, at ${req.ip}`
  );

  if (req.protocol === "https" && process.env.ENV !== "DEV") {
    if (!req.hostname.match(process.env.DOMAIN)) return res.status(401).send({ message: "Acceso denegado." });
  }
  else if (process.env.ENV === "DEV"){
    console.log(req.hostname.match(process.env.DOMAIN));
    if (!req.hostname.match(process.env.DOMAIN)) return res.status(401).send({ message: "Acceso denegado." });
  }
  else return res.status(401).send({ message: "Acceso denegado." });

  next();
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  hostnameAuthorization,
};
