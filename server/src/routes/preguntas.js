const router = require("express").Router();
const {
  headerAuthorization,
  validateAuthorization,
} = require("../controllers/auth");
const preguntasController = require("../controllers/controlPregunta");

router.get(
  "/",
  headerAuthorization,
  validateAuthorization,
  preguntasController.get
);
router.post(
  "/",
  headerAuthorization,
  validateAuthorization,
  preguntasController.insert
);
router.get(
  "/enabled",
  headerAuthorization,
  validateAuthorization,
  preguntasController.getByCategoria
);
router.get(
  "/:id",
  headerAuthorization,
  validateAuthorization,
  preguntasController.getSingle
);
router.patch(
  "/update/:id",
  headerAuthorization,
  validateAuthorization,
  preguntasController.update
);
router.delete(
  "/delete/:id",
  headerAuthorization,
  validateAuthorization,
  preguntasController.delete
);

module.exports = router;
