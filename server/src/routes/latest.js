const router = require("express").Router();
const { authenticateToken } = require("../controllers/auth");
const latestController = require("../controllers/controlLatest");

router.get("/:tabla", authenticateToken, latestController.getLatest);

module.exports = router;