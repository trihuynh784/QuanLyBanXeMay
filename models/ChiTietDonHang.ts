import mongoose from "mongoose";

const ChiTietDonHangSchema = new mongoose.Schema(
  {
    donHangId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonHang",
      required: true,
    },
    xeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Xe",
      required: true,
    },
    giaBan: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ChiTietDonHang = mongoose.model(
  "ChiTietDonHang",
  ChiTietDonHangSchema,
  "ChiTietDonHang",
);

export default ChiTietDonHang;
