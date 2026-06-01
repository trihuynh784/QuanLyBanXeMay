"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const KhachHangSchema = new mongoose_1.default.Schema({
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
    avatar: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});
const KhachHang = mongoose_1.default.model("KhachHang", KhachHangSchema, "KhachHang");
exports.default = KhachHang;
