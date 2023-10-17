const express = require("express");
const backofficeControllers = require("../controllers/backoffice.controllers");
const backofficeRoutes = express();

backofficeRoutes.get(
  "/packagesPerDay/:date",
  backofficeControllers.packagesPerDay
);
module.exports = backofficeRoutes;
