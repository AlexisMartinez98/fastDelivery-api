const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/user.controllers");
const Package=require("../models/packages.model")
const User=require("../models/user.model")
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
userRoutes.post("/history",UserController.userHistory)
userRoutes.put("/take-package",UserController.takePackage)
userRoutes.post("/dealers",UserController.getDealers)






module.exports = userRoutes;
