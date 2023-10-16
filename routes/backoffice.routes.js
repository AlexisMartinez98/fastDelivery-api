const express = require("express");
const backofficeControllers = require("../controllers/backoffice.controllers");
const backofficeRoutes = express();

backofficeRoutes.get(
  "/packages-per-day/:date",
  backofficeControllers.packagesPerDay
);
module.exports = backofficeRoutes;
