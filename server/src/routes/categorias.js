const router = require("express").Router();
const { authenticateToken } = require("../controllers/auth");
const categoriasController = require("../controllers/controlCategoria");

router.get("/", authenticateToken, categoriasController.get);
router.post("/", authenticateToken,categoriasController.insert);
router.get("/:id", authenticateToken,categoriasController.getSingle);
router.patch("/update/:id", authenticateToken,categoriasController.update);
router.delete("/delete/:id", authenticateToken,categoriasController.delete);

module.exports = router;
