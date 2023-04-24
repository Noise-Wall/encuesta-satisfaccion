const router = require("express").Router();

const empresaController = require("../controllers/controlEmpresa");

router.get("/", empresaController.get);
router.post("/", empresaController.insert);
router.get("/:id", empresaController.getSingle);
router.patch("/update/:id", empresaController.update);
router.delete("/delete/:id", empresaController.delete);

module.exports = router;
