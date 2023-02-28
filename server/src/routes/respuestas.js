const router = require('express').Router();

const respuestaController = require("../controllers/temp");

router.get("/", respuestaController.temp);

module.exports = router;