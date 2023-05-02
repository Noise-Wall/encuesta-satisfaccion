const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const categoriasController = require("../controllers/controlCategoria");

router.get("/", headerAuthorization, categoriasController.get);
router.post("/", headerAuthorization, categoriasController.insert);
router.get("/:id", headerAuthorization, categoriasController.getSingle);
router.patch("/update/:id", headerAuthorization, categoriasController.update);
router.delete("/delete/:id", headerAuthorization, categoriasController.delete);

module.exports = router;
