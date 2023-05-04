const router = require("express").Router();
const { authenticateToken } = require('../controllers/auth')
const { loginLimiter } = require("../controllers/rateLimit")
const userController = require("../controllers/controlUser");


router.get("/", userController.get);
router.post("/login", loginLimiter, userController.login);
router.post("/check", userController.validate);
router.post("/logout", userController.logout);
router.post("/validate", authenticateToken)
router.post("/", userController.insert);
router.get("/:id", userController.getSingle);
router.patch("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;