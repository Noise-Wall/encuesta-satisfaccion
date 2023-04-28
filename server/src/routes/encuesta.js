const router = require("express").Router();
const {
  headerAuthorization,
  validateAuthorization,
} = require("../controllers/auth");
const encuestaController = require("../controllers/controlEncuesta");

router.get(
  "/",
  headerAuthorization,
  validateAuthorization,
  encuestaController.get
);
router.post(
  "/",
  headerAuthorization,
  validateAuthorization,
  encuestaController.insert
);
router.get(
  "/datos/:id",
  headerAuthorization,
  validateAuthorization,
  encuestaController.getEncuestaData
);
router.get(
  "/:id",
  headerAuthorization,
  validateAuthorization,
  encuestaController.getSingle
);
router.patch(
  "/update/:id",
  headerAuthorization,
  validateAuthorization,
  encuestaController.update
);
router.delete(
  "/delete/:id",
  headerAuthorization,
  validateAuthorization,
  encuestaController.delete
);

module.exports = router;
