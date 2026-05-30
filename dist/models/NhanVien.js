"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NhanVienSchema = new mongoose_1.default.Schema({
    vaiTroId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const NhanVien = mongoose_1.default.model("NhanVien", NhanVienSchema, "NhanVien");
exports.default = NhanVien;
