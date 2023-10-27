const userModel = require("../models/user.model");
const Package = require("../models/packages.model");
const generateId = require("../helpers/generateId");

class UserService {
  static async createUser({ email, password, salt, is_admin, nombre, apellido }) {
    try {
      const newUser = new userModel({ email, password, salt, is_admin, nombre, apellido });
      const addToken = generateId();
      newUser.token = addToken;
      await newUser.setPassword(password);
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating new user: " + error.message);
    }
  }

}

module.exports = UserService;
