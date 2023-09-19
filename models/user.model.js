const mongoose = require("mongoose");
const modelOptions=require("./model.options")

const userSchema = new mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        required: true,
        select: false,
      },
    },
    { modelOptions }
  );


  const userModel = mongoose.model("User", userSchema);

  module.exports=userModel