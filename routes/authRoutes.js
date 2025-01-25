const express = require("express");
const router = express.Router();
const authController = require("../userControllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/dashBoard", authMiddleware.protect, authController.getProfile);
module.exports = router;
