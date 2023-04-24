const router = require("express").Router();

const respuestaController = require("../controllers/controlRespuesta");

router.get("/", respuestaController.get);
router.post("/", respuestaController.insert);
router.get("/group/:id", respuestaController.getByEncuesta);
router.get("/:id", respuestaController.getSingle);
router.patch("/update/:id", respuestaController.update);
router.delete("/delete/:id", respuestaController.delete);

module.exports = router;
