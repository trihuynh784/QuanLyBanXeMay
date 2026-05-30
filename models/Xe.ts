import mongoose from "mongoose";

const XeSchema = new mongoose.Schema(
  {
    soKhung: {
      type: String,
      required: true,
      unique: true, // Vì là PK trong cơ sở dữ liệu gốc
    },
    soMay: {
      type: String,
      required: true,
    },
    dongXeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DongXe",
      required: true,
    },
    mauSac: {
      type: String,
      required: true,
    },
    trangThaiXe: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Xe = mongoose.model("Xe", XeSchema, "Xe");

export default Xe;
