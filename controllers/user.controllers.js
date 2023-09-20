const UserService = require("../services/user.services");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { generateJWT, verifyJWT } = require("../helpers/generateJwt");

class UserController {
  static async createUser(req, res) {
    try {
      const { email, password, salt, is_admin, confirm_password } = req.body;
      const userExists = await userModel.findOne({ email: email });
      if (userExists) return res.status(400).json("email already exists");
      if (password !== confirm_password) {
        return res.status(404).json("passwords do not match");
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await UserService.createUser({
        email,
        password,
        salt,
        is_admin,
      });
      return res.status(201).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async authentication(req, res) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return res.status(404).json({ msg: "El usuario no existe." });
      }
      if (await user.validPassword(password)) {
        // res.cookie("token", generateJWT(user.email));
        res.status(200).json({
          _id: user._id,
          email: user.email,
          token: generateJWT(user.email),
        });
      } else {
        res.status(401).json({ msg: "Contraseña incorrecta." });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async me(req, res) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(418).send("no hay user");
    }
    const { payload } = verifyJWT(token);
    console.log("payload", payload);
    res.json(payload);
  }
}

module.exports = UserController;
