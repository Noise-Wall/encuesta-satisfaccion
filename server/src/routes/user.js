const router = require("express").Router();
const { authenticateToken } = require("../controllers/auth");
const userController = require("../controllers/controlUser");

router.get("/", authenticateToken, userController.get);
router.post("/login", userController.login);
router.post("/", authenticateToken, userController.insert);
router.get("/:id", authenticateToken, userController.getSingle);
router.patch("/update/:id", authenticateToken, userController.update);
router.delete("/delete/:id", authenticateToken, userController.delete);

module.exports = router;
