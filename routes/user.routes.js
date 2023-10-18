const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/user.controllers");

const {
  createUserValidation,
  loginValidation,
} = require("../midlewares/userValidator.midlewares");

userRoutes.post("/register", createUserValidation, UserController.createUser);
userRoutes.post("/login", loginValidation, UserController.authentication);
userRoutes.get("/me", UserController.me);
userRoutes.get("/confirm/:token", UserController.confirm);
userRoutes.post("/forgetPassword", UserController.forgetPassword);
userRoutes.post("/newPassword/:token", UserController.newPassword);
userRoutes.get("/logout", UserController.logout);








module.exports = userRoutes;
