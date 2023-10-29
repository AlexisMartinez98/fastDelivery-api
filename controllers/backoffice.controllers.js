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
      const usersAndPackages = await backofficeServices.getDealers({ delivery_date });
      const { packages, users }=usersAndPackages


      // codigo para filtrar usuarios con paquetes asignados.

      /*if(packages.length<=0){
        throw new Error("No hay paquetes asignados el día de hoy")}


      let usersId = [];
      for (let i = 0; i < packages.length; i++) {
        if (
          packages[i].deliveryMan_id &&
          !usersId.includes(packages[i].deliveryMan_id)
        ) {
          usersId.push(packages[i].deliveryMan_id);
        }
      }

      let promesas = usersId.map((userId) => {
        return userModel.findById(userId);
      });

      const users = await Promise.all(promesas);
      console.log("users",users)
      */

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
}
module.exports = backofficeControllers;
