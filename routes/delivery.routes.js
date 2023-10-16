const express = require("express");
const deliveryControllers = require("../controllers/delivery.controllers");
const deliveryRoutes = express.Router();

deliveryRoutes.get("/all-packages", deliveryControllers.getAllPackages);

module.exports = deliveryRoutes;
