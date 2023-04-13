const router = require("express").Router();

const encuestaController = require("../controllers/controlEncuesta");

router.get("/", encuestaController.get);
router.post("/", encuestaController.insert);
router.get("/datos/:id", encuestaController.getEncuestaData);
router.get("/:id", encuestaController.getSingle);
router.patch("/update/:id", encuestaController.update);
router.delete("/delete/:id", encuestaController.delete);

module.exports = router;
