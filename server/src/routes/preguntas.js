const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const preguntasController = require("../controllers/controlPregunta");

router.get("/", headerAuthorization, preguntasController.get);
router.post("/", headerAuthorization, preguntasController.insert);
router.get("/enabled", headerAuthorization, preguntasController.getByCategoria);
// tres rutas diferentes para poder aceptar todos los parametros o solo uno.
router.get("/respuestas/:id", headerAuthorization, preguntasController.getByRespuestas);
router.get("/respuestas/:id/:year", headerAuthorization, preguntasController.getByRespuestas);
router.get("/respuestas/:id/:year/:cuarto", headerAuthorization, preguntasController.getByRespuestas);
router.get("/:id", headerAuthorization, preguntasController.getSingle);
router.patch("/update/:id", headerAuthorization, preguntasController.update);
router.delete("/delete/:id", headerAuthorization, preguntasController.delete);

module.exports = router;
