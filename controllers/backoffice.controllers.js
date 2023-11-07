const packageModel = require("../models/packages.model");
const userModel = require("../models/user.model");
const PackageService = require("../services/package.services");
const backofficeServices = require("../services/backoffice.services");
const { processDealersInfo } = require("../helpers/dealers.info");

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
      res.status(201).json({ newPackage, msg: "Se agrego paquete con exito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al agregar paquete" });
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

  static async getDealers(req, res) {
    const { delivery_date } = req.query;
    try {
      const usersAndPackages = await backofficeServices.getDealers({
        delivery_date,
      });
      const { packages, users } = usersAndPackages;
      const usersCopy = users.map((user) => user.toObject());
      const dealersInfo = processDealersInfo(usersCopy, packages);

      res.status(200).json({ dealersInfo });
    } catch (error) {
      console.error("Error en dealers:", error);
      res.status(400).json({
        error:
          error.message || "Error al obtener los repartidores para esa fecha",
      });
    }
  }
  static async getDealersById(req, res) {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error en repartidor:", error);
      res.status(400).json({
        error:
          error.message || "Error al obtener los repartidores para esa fecha",
      });
    }
  }
  static async dealersToDisabled(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const user = await userModel.findByIdAndUpdate(id, { status: status });
      res.status(200).json({ msg: "Se actualizo el estado del repartidor" });
    } catch (error) {
      console.error("Error en repartidor:", error);
      res.status(400).json({
        error: error.message || "Error al obtener el repartidor",
      });
    }
  }
  static async delearHistory(req, res) {
    const { id, delivered } = req.query;
    try {
      const packages = await packageModel.find({
        deliveryMan_id: id,
        delivered: delivered,
      });
      res.status(200).json({ packages });
    } catch (error) {
      console.error("Error en repartidor:", error);
      res.status(400).json({
        error: error.message || "Error al obtener el repartidor",
      });
    }
  }
}
module.exports = backofficeControllers;
