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
  static async addPackages(req, res) {
    try {
      const newPackage = await packageModel.create(req.body);
      res.status(200).json({ newPackage });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "error al añadir paquete" });
    }
  }
  static async getAllDeliveryManByDate(req, res) {
    try {
      const dateString = req.params.date;
      const splitDate = dateString.split("T")[0];
      const deliveryMen = await packageModel.aggregate([
        {
          $match: { delivery_date: splitDate },
        },
        {
          $group: {
            _id: "$deliveryMan_id",
            deliveries: {
              $push: {
                _id: "$_id",
                delivered: "$delivered",
              },
            },
          },
        },
      ]);

      res.status(200).json({ deliveryMen });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: "Error al obtener los repartidores para esa fecha" });
    }
  }
}
module.exports = backofficeControllers;
