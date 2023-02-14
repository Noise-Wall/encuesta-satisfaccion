const router = require("express").Router();

const categoriaController = require("../controllers/categorias");

router.get("/", categoriaController.list);
router.post("/", categoriaController.add);
router.get("/editar/:id", categoriaController.edit);
router.post("/editar", categoriaController.update);
router.get("/eliminar/:id", categoriaController.delete);

module.exports = router;
