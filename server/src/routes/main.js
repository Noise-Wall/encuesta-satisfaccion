const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const mainController = require("../controllers/controlMain");

router.get("/", headerAuthorization, mainController.all);

module.exports = router;
