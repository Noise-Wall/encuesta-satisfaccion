const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const latestController = require("../controllers/controlLatest");

router.get("/:tabla", headerAuthorization, latestController.getLatest);

module.exports = router;
