"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DonHangSchema = new mongoose_1.default.Schema({
    khachHangId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const DonHang = mongoose_1.default.model("DonHang", DonHangSchema, "DonHang");
exports.default = DonHang;
