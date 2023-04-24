const router = require('express').Router();

const mainController = require("../controllers/controlMain");

router.get("/", mainController.all);

module.exports = router;