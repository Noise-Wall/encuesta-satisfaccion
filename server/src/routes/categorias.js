const router = require("express").Router();
const categoriasController = require("../controllers/controlCategoria");

router.get("/", categoriasController.get);
router.post("/", categoriasController.insert);
router.get("/:id", categoriasController.getSingle);
router.patch("/update/:id", categoriasController.update);
router.delete("/delete/:id", categoriasController.delete);

module.exports = router;
