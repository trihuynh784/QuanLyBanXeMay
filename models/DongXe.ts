import mongoose from "mongoose";

const DongXeSchema = new mongoose.Schema(
  {
    tenHang: {
      type: String,
      required: true,
    },
    tenDongXe: {
      type: String,
      required: true,
    },
    namSanXuat: {
      type: Number,
      required: true,
    },
    giaNiemYet: {
      type: Number,
      required: true,
    },
    moTa: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const DongXe = mongoose.model("DongXe", DongXeSchema, "DongXe");

export default DongXe;
