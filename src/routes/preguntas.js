const express = require("express");
const router = express.Router();

// controller
const preguntasController = require("../controllers/preguntas");

router.get("/", preguntasController.list);
router.post("/", preguntasController.add);
router.get("/editar/:idPregunta", preguntasController.edit);
router.post("/editar", preguntasController.update)

module.exports = router;
