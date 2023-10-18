const packageModel = require("../models/packages.model");
const PackageService = require("../services/package.services");

class backofficeControllers {
  static async packagesPerDay(req, res) {
    try {
      const date = req.params.date;
      const allPackagesPerDay = await packageModel.find({
        delivery_date: date,
      });
      res.status(200).json({ allPackagesPerDay });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: "error when displaying packages from that date" });
    }
  }

  static async addPackage(req, res) {
    try {
      const packageData = req.body;
      const newPackage = await PackageService.createPackage(packageData);
      res.status(201).json({ newPackage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error adding package" });
    }
  }

}
module.exports = backofficeControllers;
