const mongoose = require("mongoose");
const modelOptions = require("./model.options");

const deliveryDaySchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    id_package_detail: {
        type: Number,
        required: true,
      },
    date_delivery_date: {
      type: Date,
      required: true,
    },
  },
  { modelOptions }
);
const deliveryDayModel = mongoose.model("DeliveryDay", deliveryDaySchema);

module.exports = deliveryDayModel;
