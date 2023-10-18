const express = require("express");
const backofficeControllers = require("../controllers/backoffice.controllers");
const backofficeRoutes = express();
const authAdmin = require("../midlewares/authAdmin.middleware")

backofficeRoutes.get(
  "/packages-per-day/:date",
  backofficeControllers.packagesPerDay
);

backofficeRoutes.post(
  "/addPackages", authAdmin,
  backofficeControllers.addPackage
);


module.exports = backofficeRoutes;
