const packageModel = require("../models/packages.model");

class deliveryControllers {
  static async getAllPackages(req, res) {
    try {
      const allPackages = await packageModel.find({ asigned: false });
      res.status(200).json(allPackages);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = deliveryControllers;
