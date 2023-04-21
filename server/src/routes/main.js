const router = require('express').Router();
const { authenticateToken } = require("../controllers/auth");
const mainController = require("../controllers/controlMain");

router.get("/", authenticateToken, mainController.all);

module.exports = router;