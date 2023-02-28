const router = require('express').Router();

const preguntasController = require("../controllers/temp");

router.get("/", preguntasController.temp);

module.exports = router;