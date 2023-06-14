const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const preguntasController = require("../controllers/controlPregunta");

router.get("/", headerAuthorization, preguntasController.get);
router.post("/", headerAuthorization, preguntasController.insert);
router.get("/enabled", headerAuthorization, preguntasController.getByCategoria);
router.get("/:id", headerAuthorization, preguntasController.getSingle);
router.patch("/update/:id", headerAuthorization, preguntasController.update);
router.delete("/delete/:id", headerAuthorization, preguntasController.delete);

module.exports = router;
