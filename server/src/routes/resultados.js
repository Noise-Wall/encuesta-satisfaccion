const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const resultadoController = require("../controllers/controlResultados");

router.get(
  "/:year",
  headerAuthorization,
  resultadoController.clean,
  resultadoController.export
);
router.get("/data/:year", headerAuthorization, resultadoController.data);
router.get(
  "/data/:year/:cuarto",
  headerAuthorization,
  resultadoController.data
);

module.exports = router;
