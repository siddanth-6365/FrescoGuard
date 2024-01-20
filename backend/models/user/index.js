const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  type: {
    type: String,
    enum: ["producer", "retailer"],
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
