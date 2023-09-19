const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const routes = require("./routes/index");
const router = express();

require("dotenv").config();
const PORT = process.env.PORT;
//Actualizar ruta de la  db
// const db = require("./config")
// const models = require("./models")
router.use(cors());
router.use(morgan("tiny"));
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

// router.use("/api/v1", routes);
//Agregar vinculacion de mongoose:

router.listen(4000, () => {
  console.log("listening on port 4000");
});
