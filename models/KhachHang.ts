import mongoose from "mongoose";

const KhachHangSchema = new mongoose.Schema(
  {
    tenDangNhap: {
      type: String,
      required: true,
      unique: true,
    },
    matKhau: {
      type: String,
      required: true,
    },
    token: String,
    hoTen: {
      type: String,
      required: true,
    },
    cccd: {
      type: String,
      required: true,
    },
    soDienThoai: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    diaChi: {
      type: String,
      required: true,
    },
    trangThai: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const KhachHang = mongoose.model("KhachHang", KhachHangSchema, "KhachHang");

export default KhachHang;
