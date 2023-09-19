const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/user.controllers");
const {
  createUserValidation,
  loginValidation,
} = require("../midlewares/userValidator.midlewares");

userRoutes.post("/register", createUserValidation, UserController.createUser);
userRoutes.post("/login", loginValidation, UserController.authentication);

module.exports = userRoutes;
