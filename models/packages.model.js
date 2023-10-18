const mongoose = require("mongoose");
const modelOptions = require("./model.options");

const packageSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    deliveryMan_id: {
      type: String,
      default: "",
    },
    weight: {
      type: Number,
      required: true,
    },
    delivery_date: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    assigned: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  { modelOptions }
);
const packageModel = mongoose.model("Packages", packageSchema);

module.exports = packageModel;