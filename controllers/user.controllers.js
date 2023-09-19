const UserService = require("../services/user.services");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

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
}
module.exports = UserController;
