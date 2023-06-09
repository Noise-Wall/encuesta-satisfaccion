const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const resultadoController = require("../controllers/controlResultados");

router.get("/:year", headerAuthorization, resultadoController.export);

module.exports = router;