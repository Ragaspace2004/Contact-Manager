const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" });

    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Get current user
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user); // Assuming req.user is already set by middleware
});

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are mandatory" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ username, email, password: hashedPassword });

  if (newUser) {
    res.status(201).json({ username, email }); // Avoid sending hashedPassword in response
  } else {
    res.status(400).json({ message: "User not created" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  currentUser
};
