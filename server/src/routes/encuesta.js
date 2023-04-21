const router = require("express").Router();
const { authenticateToken } = require("../controllers/auth");
const encuestaController = require("../controllers/controlEncuesta");

router.get("/", authenticateToken, encuestaController.get);
router.post("/", authenticateToken, encuestaController.insert);
router.get("/datos/:id", authenticateToken, encuestaController.getEncuestaData);
router.get("/:id", authenticateToken, encuestaController.getSingle);
router.patch("/update/:id", authenticateToken, encuestaController.update);
router.delete("/delete/:id", authenticateToken, encuestaController.delete);

module.exports = router;
