const router = require("express").Router();
const { headerAuthorization } = require("../controllers/auth");
const empresaController = require("../controllers/controlEmpresa");

router.get("/", headerAuthorization, empresaController.get);
router.post("/", headerAuthorization, empresaController.insert);
router.get("/:id", headerAuthorization, empresaController.getSingle);
router.patch("/update/:id", headerAuthorization, empresaController.update);
router.delete("/delete/:id", headerAuthorization, empresaController.delete);

module.exports = router;
