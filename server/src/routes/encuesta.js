const router = require('express').Router();

const encuestaController = require("../controllers/temp");

router.get("/", encuestaController.temp);

module.exports = router;