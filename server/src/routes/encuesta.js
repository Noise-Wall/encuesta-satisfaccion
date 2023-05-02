const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const encuestaController = require("../controllers/controlEncuesta");

router.get("/", headerAuthorization, encuestaController.get);
router.post("/", headerAuthorization, encuestaController.insert);
router.get(
  "/datos/:id",
  headerAuthorization,
  encuestaController.getEncuestaData
);
router.get("/:id", headerAuthorization, encuestaController.getSingle);
router.patch("/update/:id", headerAuthorization, encuestaController.update);
router.delete("/delete/:id", headerAuthorization, encuestaController.delete);

module.exports = router;
