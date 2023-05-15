const rateLimit = require("express-rate-limit");

// limita los intentos fallidos de inicio de sesion.
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    message:
      "Han habido demasiados intentos de inicio de sesión fallidos desde esta IP. Favor de intentarlo más tarde.",
  },
  skipSuccesfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});

// limita peticiones por cada segundo y medio.
const stdRateLimiter = rateLimit({
  windowMs: 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  loginLimiter,
  stdRateLimiter,
};
