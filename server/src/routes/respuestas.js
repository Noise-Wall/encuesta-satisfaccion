const router = require("express").Router();
const {
  headerAuthorization,
  validateAuthorization,
} = require("../controllers/auth");
const respuestaController = require("../controllers/controlRespuesta");

router.get(
  "/",
  headerAuthorization,
  validateAuthorization,
  respuestaController.get
);
router.post(
  "/",
  headerAuthorization,
  validateAuthorization,
  respuestaController.insert
);
router.get(
  "/group/:id",
  headerAuthorization,
  validateAuthorization,
  respuestaController.getByEncuesta
);
router.get(
  "/:id",
  headerAuthorization,
  validateAuthorization,
  respuestaController.getSingle
);
router.patch(
  "/update/:id",
  headerAuthorization,
  validateAuthorization,
  respuestaController.update
);
router.delete(
  "/delete/:id",
  headerAuthorization,
  validateAuthorization,
  respuestaController.delete
);
router.delete(
  "/delete/group/:id",
  headerAuthorization,
  validateAuthorization,
  respuestaController.deleteByEncuesta
);

module.exports = router;
