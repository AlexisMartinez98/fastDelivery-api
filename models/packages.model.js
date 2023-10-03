const mongoose = require("mongoose");
const modelOptions = require("./model.options");

const packageSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    delivery_date: {
      type: Date,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
  },
  { modelOptions }
);
const packageModel = mongoose.model("Packages", packageSchema);

module.exports = packageModel;
