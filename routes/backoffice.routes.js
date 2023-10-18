const express = require("express");
const backofficeControllers = require("../controllers/backoffice.controllers");
const backofficeRoutes = express();

backofficeRoutes.get(
  "/packagesPerDay/:date",
  backofficeControllers.packagesPerDay
);
backofficeRoutes.post("/addPackages", backofficeControllers.addPackages);
backofficeRoutes.get(
  "/getAllDeliveryManByDate/:date",
  backofficeControllers.getAllDeliveryManByDate
);

backofficeRoutes.post("/dealers",backofficeControllers.getDealers)

module.exports = backofficeRoutes;
