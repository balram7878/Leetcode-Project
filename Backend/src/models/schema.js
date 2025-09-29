const { isLowercase } = require("validator");

const mongoose = require(mongo);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      value: ["user", "admin"],
      default: "user",
    },
    problemSolved: {
      type: Number,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("userSchema", userSchema);

module.exports = model;
