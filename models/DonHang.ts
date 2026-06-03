import mongoose from "mongoose";

const DonHangSchema = new mongoose.Schema(
  {
    khachHangId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KhachHang",
      required: true,
    },
    ngayDat: {
      type: Date,
      default: Date.now,
    },
    tongTien: {
      type: Number,
      required: true,
      default: 0,
    },
    trangThaiDonHang: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const DonHang = mongoose.model("DonHang", DonHangSchema, "DonHang");

export default DonHang;
