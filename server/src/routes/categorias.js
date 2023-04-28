const router = require("express").Router();
const {
  headerAuthorization,
  validateAuthorization,
} = require("../controllers/auth");
const categoriasController = require("../controllers/controlCategoria");

router.get(
  "/",
  headerAuthorization,
  validateAuthorization,
  categoriasController.get
);
router.post(
  "/",
  headerAuthorization,
  validateAuthorization,
  categoriasController.insert
);
router.get(
  "/:id",
  headerAuthorization,
  validateAuthorization,
  categoriasController.getSingle
);
router.patch(
  "/update/:id",
  headerAuthorization,
  validateAuthorization,
  categoriasController.update
);
router.delete(
  "/delete/:id",
  headerAuthorization,
  validateAuthorization,
  categoriasController.delete
);

module.exports = router;
