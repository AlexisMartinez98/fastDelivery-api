const mongoose= require ("mongoose");
import modelOptions from "./model.options";

const packageDetail = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    number_unities: {
      type: Number,
      required: true,
      select: false,
    },
    status: {
      type: Boolean,
      required: true,
      select: false,
    },
    package_loading_date: {
      type: Date,
      required: true,
      select: false,
    },
    date_create: {
      type: Date,
      default: Date.now,
      
    },
    
  },
  modelOptions
);


const packageDetailModel = mongoose.model("PackageDetail", packageDetail);

module.exports = packageDetailModel;