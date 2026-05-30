"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ThanhToanSchema = new mongoose_1.default.Schema({
    donHangId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const ThanhToan = mongoose_1.default.model("ThanhToan", ThanhToanSchema, "ThanhToan");
exports.default = ThanhToan;
