const packageModel = require("../models/packages.model");

class backofficeControllers {
  static async packagesPerDay(req, res) {
    try {
      const date = req.params.date;
      const allPackagesPerDay = await packageModel.find({
        delivery_date: date,
      });
      res.status(200).json({ allPackagesPerDay });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ error: "error when displaying packages from that date" });
    }
  }
}
module.exports = backofficeControllers;
