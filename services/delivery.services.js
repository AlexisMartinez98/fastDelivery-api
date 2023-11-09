const userModel = require("../models/user.model");
const packageModel = require("../models/packages.model");

class deliveryServices {
  static async userHistory(data) {
    const { deliveryMan_id } = data;
    try {
      const user = await userModel.findById(deliveryMan_id);
      if (!user) {
        throw new Error("User not found");
      }
      const packageHistory = await packageModel.find({
        deliveryMan_id: deliveryMan_id,
        delivered: true,
      });
      return packageHistory;
    } catch (error) {
      console.log(error);
    }
  }
  static async pendingDeliveries(data) {
    const { deliveryMan_id } = data;
    try {
      const user = await userModel.findById(deliveryMan_id);
      if (!user) {
        throw new Error("User not found");
      }
      const pendingDeliveries = await packageModel.find({
        deliveryMan_id: deliveryMan_id,
        delivered: false,
      });
      return pendingDeliveries;
    } catch (error) {
      console.error(error);
    }
  }

  static async takePackage(data) {
    const { package_id, deliveryMan_id, assigned } = data;
    try {
      const packageAsigned = await packageModel.findById(package_id);

      packageAsigned.deliveryMan_id = assigned ? deliveryMan_id : "";
      packageAsigned.assigned = assigned;
      return packageAsigned.save();
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePackageStatus(packageId, newStatus) {
    try {
      const packageUpdated = await packageModel.findById(packageId);
      if (!packageUpdated) {
        throw new Error("Paquete no encontrado");
      }
      packageUpdated.status = newStatus;
      await packageUpdated.save();
      return packageUpdated;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = deliveryServices;
