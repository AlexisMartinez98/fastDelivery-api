const Package = require("../models/packages.model");

class PackageService {
  static async createPackage(data) {
    try {
      const newPackage = new Package(data);
      return await newPackage.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PackageService;