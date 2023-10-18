const express = require("express");
const deliveryControllers = require("../controllers/delivery.controllers");
const deliveryRoutes = express.Router();

deliveryRoutes.get("/allPackages", deliveryControllers.getAllPackages);
deliveryRoutes.put("/cancelPackage/:id", deliveryControllers.cancelPackage);
deliveryRoutes.put("/finishDelivery/:id", deliveryControllers.finishDelivery);
deliveryRoutes.post("/history",deliveryControllers.userHistory)
deliveryRoutes.put("/take-package",deliveryControllers.takePackage)

module.exports = deliveryRoutes;
