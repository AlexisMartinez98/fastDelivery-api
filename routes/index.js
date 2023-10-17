const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const packageRoutes=require("./package.routes")

router.use("/user", userRoutes);
router.use("/package",packageRoutes)


module.exports = router;
