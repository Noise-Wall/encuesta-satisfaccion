const router = require('express').Router();

const latestController = require("../controllers/controlLatest");

router.get("/:tabla", latestController.getLatest);

module.exports = router;