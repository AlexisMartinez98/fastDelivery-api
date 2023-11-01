const Package = require("../models/packages.model");
const userModel = require ("../models/user.model")

class PackageService {
  static async createPackage(data) {
    try {
      const newPackage = new Package(data);
      return await newPackage.save();
    } catch (error) {
      throw error;
    }
  }
  static async getPackageById(packageId) {
    
    const singlePackage = await Package.findById(packageId);
    if (!singlePackage) {
      throw new Error('Package not found');
    }
  
    let deliveryManName = '';
  
    if (singlePackage.deliveryMan_id) {
      const deliveryMan = await userModel.findById(singlePackage.deliveryMan_id);
      if (deliveryMan) {
        deliveryManName = deliveryMan.email;
      }
    }
  
    const packageInfo = {
      id: singlePackage._id,
      address: singlePackage.address,
      deliveryManName,
    };
  
    return packageInfo;
  }

  static async getAllPackages() {
    try {
      const currentDate = new Date().toISOString().split("T")[0]; 
      const allPackages = await Package.find({ assigned: false, delivery_date: currentDate }); 
      return allPackages;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PackageService;