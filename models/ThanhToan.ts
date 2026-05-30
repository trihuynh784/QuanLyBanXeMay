import mongoose from "mongoose";

const ThanhToanSchema = new mongoose.Schema(
  {
    donHangId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonHang",
      required: true,
    },
    phuongThuc: {
      type: String,
      required: true,
    },
    soTien: {
      type: Number,
      required: true,
    },
    ngayThanhToan: {
      type: Date,
      default: Date.now,
    },
    trangThai: {
      type: String,
      required: true,
    },
    maGiaoDich: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ThanhToan = mongoose.model("ThanhToan", ThanhToanSchema, "ThanhToan");

export default ThanhToan;
