const router = require("express").Router();
const { authenticateToken } = require("../controllers/auth");
const empresaController = require("../controllers/controlEmpresa");

router.get("/", authenticateToken, empresaController.get);
router.post("/", authenticateToken, empresaController.insert);
router.get("/:id", authenticateToken, empresaController.getSingle);
router.patch("/update/:id", authenticateToken, empresaController.update);
router.delete("/delete/:id", authenticateToken, empresaController.delete);

module.exports = router;
