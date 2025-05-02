const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: [true, "Firstname is required"] },
  location: String,
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest",
  },
});

module.exports = mongoose.model("User", userSchema);
