const router = require("express").Router();

const userController = require("../controllers/controlUser");

router.get("/", userController.get);
router.post("/login", userController.login);
router.post("/", userController.insert);
// router.get("/:id", userController.getSingle);
router.patch("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;
