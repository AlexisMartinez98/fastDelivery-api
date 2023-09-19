const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/user.controllers");
const {
  createUserValidation,
} = require("../midlewares/userValidator.midlewares");

userRoutes.post("/register", createUserValidation, UserController.createUser);

module.exports = userRoutes;
