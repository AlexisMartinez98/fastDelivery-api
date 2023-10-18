const packageModel = require("../models/packages.model");
const deliveryServices=require("../services/delivery.services")

class deliveryControllers {
  static async getAllPackages(req, res) {
    try {
      const allPackages = await packageModel.find({ asigned: false });
      res.status(200).json(allPackages);
    } catch (error) {
      console.log(error);
    }
  }
  static async cancelPackage(req, res) {
    try {
      const id = req.params.id;
      const idExists = await packageModel.findById(id);
      if (!idExists) {
        return res.status(400).json({ msg: "id incorrecto" });
      }
      const cancelPackage = await packageModel.findByIdAndUpdate(id, {
        deliveryMan_id: "",
        assigned: false,
      });
      res.status(200).json({ cancelPackage });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "error al cancelar paquete" });
    }
  }
  static async finishDelivery(req, res) {
    try {
      const id = req.params.id;
      const idExists = await packageModel.findById(id);
      if (!idExists) {
        return res.status(400).json({ msg: "id incorrecto" });
      }
      if (idExists.delivered) {
        return res.status(400).json({ msg: "paquete ya entregado" });
      }
      if (!idExists.asigned || idExists.deliveryMan_id === "") {
        return res.status(400).json({ msg: "paquete no asignado" });
      }
      const finishPackage = await packageModel.findByIdAndUpdate(id, {
        delivered: true,
      });
      res.status(200).json({ finishPackage });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "error al cancelar paquete" });
    }
  }

  static async userHistory(req, res) {
    const { deliveryMan_id, delivered } = req.body;

    try {
      const packageHistory = await deliveryServices.userHistory({deliveryMan_id:deliveryMan_id,delivered:delivered});
      res.status(200).json(packageHistory);
    } catch (error) {
      console.log(error);
    }
  }

  static async takePackage(req,res){
    const { package_id, deliveryMan_id, assigned } = req.body;
    try{
      const packageAsigned=await deliveryServices.takePackage({package_id,deliveryMan_id,assigned})
      res.status(200).json(packageAsigned)

    }
    catch(error){console.log(error)

    }
  }
}
module.exports = deliveryControllers;
