const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');

const {
  registerUser,
  loginUser,
  currentUser
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, (req, res) => {
  res.status(200).json({ message: "You have access to this protected route", user: req.user,currentUser});
});

module.exports = router;
