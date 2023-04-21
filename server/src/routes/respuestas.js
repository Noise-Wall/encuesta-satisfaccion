const router = require("express").Router();
const { authenticateToken } = require("../controllers/auth");
const respuestaController = require("../controllers/controlRespuesta");

router.get("/", authenticateToken, respuestaController.get);
router.post("/", authenticateToken, respuestaController.insert);
router.get("/group/:id", authenticateToken, respuestaController.getByEncuesta);
router.get("/:id", authenticateToken, respuestaController.getSingle);
router.patch("/update/:id", authenticateToken, respuestaController.update);
router.delete("/delete/:id", authenticateToken, respuestaController.delete);

module.exports = router;
