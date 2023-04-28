require("dotenv").config();
const jwt = require("jsonwebtoken");

function jwtVerify(token) {
  jwt.verify(token, process.env.TOKENSECRET, (err, user) => {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKENSECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res) {
  const token = req.cookies.token;
  if (token == null)
    return res.status(401).json({ message: "Acceso restringido" });

  const verificacion = jwtVerify(token);
  if (!verificacion)
    return res.status(403).json({ message: "Acceso prohibido" });

  res.status(202).json({ message: "Aceptado" });
}

function headerAuthorization(req, res, next) {
  const origin = req.headers.origin || "";
  const isCookie = req.cookies.clientOrigin

  if (origin.match(process.env.DOMAIN) && !isCookie) {
    res.cookie("clientOrigin", generateAccessToken({ test: "test" }), {
      domain: process.env.DOMAIN,
      maxAge: 3600000,
      SameSite: false,
      secure: true,
    });
  }

  next();
}

function validateAuthorization(req, res, next) {
  const origin = req.cookies.clientOrigin;
  if (origin == null) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  const verificacion = jwtVerify(origin);
  if (!verificacion)
    return res.status(403).json({ message: "Acceso prohibido" });

  next();
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  headerAuthorization,
  validateAuthorization,
};
