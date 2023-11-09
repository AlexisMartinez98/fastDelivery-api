const packageModel = require("../models/packages.model");
const userModel = require("../models/user.model");
const deliveryServices = require("../services/delivery.services");
const PackageService = require("../services/package.services");

class deliveryControllers {
  static async getAllPackages(req, res) {
    try {
      const allPackages = await PackageService.getAllPackages();
      res.status(200).json(allPackages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al obtener paquetes", error });
    }
  }

  static async getPackage(req, res) {
    try {
      const packageId = req.params.packageId;
      const packageInfo = await PackageService.getPackageById(packageId);

      res.status(200).json({
        _id: packageInfo._id,
        address: packageInfo.address,
        receiver: packageInfo.receiver,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
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
        status: "PENDIENTE",
      });
      res.status(200).json({ cancelPackage });
    } catch (error) {
      console.error(error);
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
      if (!idExists.assigned || idExists.deliveryMan_id === "") {
        return res.status(400).json({ msg: "paquete no asignado" });
      }
      const finishPackage = await packageModel.findByIdAndUpdate(id, {
        delivered: true,
        status: "ENTREGADO",
      });
      res.status(200).json({ finishPackage });
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: "error al cancelar paquete" });
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
        status: "PENDIENTE",
      });
      res.status(200).json({ cancelPackage });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "error al cancelar paquete" });
    }
  }

  static async userHistory(req, res) {
    const { deliveryMan_id } = req.body;

    try {
      const packageHistory = await deliveryServices.userHistory({
        deliveryMan_id: deliveryMan_id,
        delivered: true,
      });
      res.status(200).json(packageHistory);
    } catch (error) {
      console.error("Error en userHistory:", error);
      res
        .status(400)
        .json({ error: "Error al obtener el historial del usuario" });
    }
  }
  static async getPendingDeliveries(req, res) {
    const { deliveryMan_id } = req.body;
    try {
      const pendingDeliveries = await deliveryServices.pendingDeliveries({
        deliveryMan_id: deliveryMan_id,
        delivered: false,
      });
      res.status(200).json(pendingDeliveries);
    } catch (error) {
      console.error("Error get pending deliveries:", error);
      res.status(400).json({ error: "Error al obtener repartos pendientes" });
    }
  }

  static async takePackage(req, res) {
    const { package_id, deliveryMan_id, assigned } = req.body;
    const userAssigned = await userModel.findById(deliveryMan_id);
    console.log(userAssigned.status);
    if (!userAssigned.status) {
      res
        .status(401)
        .json({ error: "Usted no esta habilitado, contacte con el soporte" });
    } else {
      try {
        const packageAsigned = await deliveryServices.takePackage({
          package_id,
          deliveryMan_id,
          assigned,
        });
        res.status(200).json(packageAsigned);
      } catch (error) {
        console.error("Error en takePackage:", error);
        res
          .status(400)
          .json({ error: "Error al asignar un paquete al usuario" });
      }
    }
  }
  static async updatePackageStatus(req, res) {
    const { packageId } = req.params;
    const { status } = req.body;
    try {
      const updatedPackage = await deliveryServices.updatePackageStatus(
        packageId,
        status
      );
      res.status(200).json(updatedPackage);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar el estado del paquete" });
    }
  }
}
module.exports = deliveryControllers;
