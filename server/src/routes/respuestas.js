const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const respuestaController = require("../controllers/controlRespuesta");

router.get("/", headerAuthorization, respuestaController.get);
router.post("/", headerAuthorization, respuestaController.insert);
router.get(
  "/group/:id",
  headerAuthorization,
  respuestaController.getByEncuesta
);
router.get("/:id", headerAuthorization, respuestaController.getSingle);
router.patch("/update/:id", headerAuthorization, respuestaController.update);
router.delete("/delete/:id", headerAuthorization, respuestaController.delete);
router.delete(
  "/delete/group/:id",
  headerAuthorization,
  respuestaController.deleteByEncuesta
);

module.exports = router;
