const router = require('express').Router();

const resultadosController = require("../controllers/temp");

router.get("/", resultadosController.temp);

module.exports = router;