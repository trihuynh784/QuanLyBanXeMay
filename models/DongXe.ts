import mongoose from "mongoose";

const DongXeSchema = new mongoose.Schema(
  {
    loaiXeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoaiXe",
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

    dungTichXiLanh: {
      type: Number,
      required: true,
    },

    mucTieuThuNhienLieu: {
      type: Number,
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

const DongXe = mongoose.model("DongXe", DongXeSchema, "DongXe");

export default DongXe;
