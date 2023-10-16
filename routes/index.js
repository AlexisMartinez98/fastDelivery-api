const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const deliveryRoutes = require("./delivery.routes");
const backofficeRoutes = require("./backoffice.routes");

router.use("/user", userRoutes);
router.use("/delivery", deliveryRoutes);
router.use("/backoffice", backofficeRoutes);

module.exports = router;
