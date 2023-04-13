const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, getCurrentUser);
router.post("/logout", validateToken, logoutUser);

module.exports = router;
