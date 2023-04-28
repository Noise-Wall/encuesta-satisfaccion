const router = require("express").Router();
const {
  headerAuthorization,
  validateAuthorization,
} = require("../controllers/auth");
const latestController = require("../controllers/controlLatest");

router.get(
  "/:tabla",
  headerAuthorization,
  validateAuthorization,
  latestController.getLatest
);

module.exports = router;
