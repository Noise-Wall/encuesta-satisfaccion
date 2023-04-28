const router = require("express").Router();
const {
  headerAuthorization,
  validateAuthorization,
} = require("../controllers/auth");
const empresaController = require("../controllers/controlEmpresa");

router.get(
  "/",
  headerAuthorization,
  validateAuthorization,
  empresaController.get
);
router.post(
  "/",
  headerAuthorization,
  validateAuthorization,
  empresaController.insert
);
router.get(
  "/:id",
  headerAuthorization,
  validateAuthorization,
  empresaController.getSingle
);
router.patch(
  "/update/:id",
  headerAuthorization,
  validateAuthorization,
  empresaController.update
);
router.delete(
  "/delete/:id",
  headerAuthorization,
  validateAuthorization,
  empresaController.delete
);

module.exports = router;
