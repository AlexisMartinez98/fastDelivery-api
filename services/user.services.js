const userModel = require("../models/user.model");
const Package = require("../models/packages.model");
const generateId = require("../helpers/generateId");

class UserService {
  static async createUser({ email, password, salt, is_admin }) {
    try {
      const newUser = new userModel({ email, password, salt, is_admin });
      const addToken = generateId();
      newUser.token = addToken;
      await newUser.setPassword(password);
      return await newUser.save();
    } catch (error) {
      throw new Error("Error creating new user: " + error.message);
    }
  }

  static async userHistory(data) {
    const { deliveryMan_id, delivered } = data;
    try {
      const user = await userModel.findById(deliveryMan_id);
      if (!user) {
        throw new Error("User not found");
      }
      const packageHistory = await Package.find({
        deliveryMan_id: deliveryMan_id,
        delivered: delivered,
      });
      return packageHistory;
    } catch (error) {
      console.log(error);
    }
  }

  static async takePackage(data) {
    const { package_id, deliveryMan_id, assigned } = data;

    try {
      const packageAsigned = await Package.findById(package_id);
      packageAsigned.deliveryMan_id = deliveryMan_id;
      packageAsigned.assigned = assigned;

      return packageAsigned.save();
    } catch (error) {
      console.log(error);
    }
  }

  static async getDealers(data){
    const {delivery_date}=data;
    try{
      
      const packages=await Package.find({delivery_date})
      return packages;

    }
    catch(error){console.log(error)

    }
  }
}

module.exports = UserService;
