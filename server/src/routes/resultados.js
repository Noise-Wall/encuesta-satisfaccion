const router = require('express').Router();

const resultadosController = require("../controllers/controlResultado");

router.get("/", resultadosController.get);
router.post("/", resultadosController.insert);

module.exports = router;