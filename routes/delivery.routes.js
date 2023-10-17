const express = require("express");
const deliveryControllers = require("../controllers/delivery.controllers");
const deliveryRoutes = express.Router();

deliveryRoutes.get("/allPackages", deliveryControllers.getAllPackages);
deliveryRoutes.put("/cancelPackage/:id", deliveryControllers.cancelPackage);
deliveryRoutes.put("/finishDelivery/:id", deliveryControllers.finishDelivery);

module.exports = deliveryRoutes;
