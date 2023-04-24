const router = require("express").Router();

const preguntasController = require("../controllers/controlPregunta");

router.get("/", preguntasController.get);
router.post("/", preguntasController.insert);
router.get("/enabled", preguntasController.getByCategoria);
router.get("/:id", preguntasController.getSingle);
router.patch("/update/:id", preguntasController.update);
router.delete("/delete/:id", preguntasController.delete);

module.exports = router;
