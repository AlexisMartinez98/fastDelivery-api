const mongoose = require("mongoose");
const modelOptions = require("./model.options");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirm_password: {
      type: String,
      require: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { modelOptions }
);
userSchema.methods.setPassword = async function (password) {
  const salt = bcrypt.genSaltSync(8);
  this.salt = salt;
  this.password = await bcrypt.hash(password, this.salt);
};

userSchema.methods.validPassword = async function (password) {
  const hashPass = await bcrypt.hash(password, this.salt);
  return this.password === hashPass;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
