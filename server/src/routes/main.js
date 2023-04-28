const router = require("express").Router();
const {
  headerAuthorization,
  validateAuthorization,
} = require("../controllers/auth");
const mainController = require("../controllers/controlMain");

router.get("/", headerAuthorization, validateAuthorization, mainController.all);

module.exports = router;
