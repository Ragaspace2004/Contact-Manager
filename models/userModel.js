const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Please add email address"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please add password"],
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
