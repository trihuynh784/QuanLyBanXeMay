import mongoose from "mongoose";

const XeSchema = new mongoose.Schema(
  {
    soKhung: {
      type: String,
      required: true,
      unique: true,
    },
    tenXe: {
      type: String,
      required: true,
    },
    soMay: {
      type: String,
      required: true,
      unique: true,
    },
    hinhAnh: String,
    dongXeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongXe",
      required: true,
    },
    mauSac: {
      type: String,
      required: true,
    },
    namSanXuat: {
      type: Number,
      required: true,
    },
    trangThaiXe: {
      type: String,
      enum: ["ConHang", "DatCoc", "DaBan"],
      default: "ConHang",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Xe = mongoose.model("Xe", XeSchema, "Xe");

export default Xe;
