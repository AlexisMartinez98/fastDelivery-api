import mongoose, { Schema, Document } from "mongoose";
import modelOptions from "./model.options";

interface IPackageDetail extends Document {
  user_id: number;
  number_unities: number;
  status: boolean;
  package_loading_date: Date;
  date_create: Date;
}

const packageDetailSchema = new Schema<IPackageDetail>(
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

packageDetailSchema.methods.setPackageLoadingDate = function (
  this: IPackageDetail,
  package_loading_date: Date
) {
  this.package_loading_date = package_loading_date;
};

const PackageDetailModel = mongoose.model<IPackageDetail>(
  "PackageDetail",
  packageDetailSchema
);

export default PackageDetailModel;