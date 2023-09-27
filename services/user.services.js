const userModel = require("../models/user.model");

class UserService {
  static async createUser({ email, password, salt, is_admin }) {
    try {
      const newUser = new userModel({ email, password, salt, is_admin });
      await newUser.setPassword(password);
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating new user: " + error.message);
    }
  }
}

module.exports = UserService;
