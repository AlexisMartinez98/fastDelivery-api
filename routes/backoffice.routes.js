const express = require("express");
const backofficeControllers = require("../controllers/backoffice.controllers");
const backofficeRoutes = express();
const authAdmin = require("../midlewares/authAdmin.middleware");

backofficeRoutes.get(
  "/packagesPerDay/:date",
  backofficeControllers.packagesPerDay
);

backofficeRoutes.post(
  "/addPackages",
  authAdmin,
  backofficeControllers.addPackage
);

backofficeRoutes.get(
  "/getAllDeliveryManByDate/:date",
  backofficeControllers.getAllDeliveryManByDate
);

backofficeRoutes.get("/dealers", backofficeControllers.getDealers);

backofficeRoutes.get("/dealers/:id", backofficeControllers.getDealersById);

backofficeRoutes.put("/dealers/:id", backofficeControllers.dealersToDisabled);

module.exports = backofficeRoutes;
