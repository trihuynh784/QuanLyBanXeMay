import mongoose from "mongoose";

const LoaiXeSchema = new mongoose.Schema(
  {
    tenLoaiXe: {
      type: String,
      required: true,
      unique: true,
    },
    moTa: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const LoaiXe = mongoose.model("LoaiXe", LoaiXeSchema, "LoaiXe");

export default LoaiXe;
