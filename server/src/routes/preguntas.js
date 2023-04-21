const router = require("express").Router();
const { authenticateToken } = require("../controllers/auth");
const preguntasController = require("../controllers/controlPregunta");

router.get("/", authenticateToken, preguntasController.get);
router.post("/", authenticateToken, preguntasController.insert);
router.get("/enabled", authenticateToken, preguntasController.getByCategoria);
router.get("/:id", authenticateToken, preguntasController.getSingle);
router.patch("/update/:id", authenticateToken, preguntasController.update);
router.delete("/delete/:id", authenticateToken, preguntasController.delete);

module.exports = router;