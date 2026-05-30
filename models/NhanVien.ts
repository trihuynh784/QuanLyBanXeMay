import mongoose from "mongoose";

const NhanVienSchema = new mongoose.Schema(
  {
    vaiTroId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VaiTro",
      required: true,
    },
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
    soDienThoai: {
      type: String,
      required: true,
    },
    email: {
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

const NhanVien = mongoose.model("NhanVien", NhanVienSchema, "NhanVien");

export default NhanVien;
