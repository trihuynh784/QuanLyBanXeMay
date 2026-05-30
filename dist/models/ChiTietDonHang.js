"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChiTietDonHangSchema = new mongoose_1.default.Schema({
    donHangId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "DonHang",
        required: true,
    },
    xeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Xe",
        required: true,
    },
    giaBan: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const ChiTietDonHang = mongoose_1.default.model("ChiTietDonHang", ChiTietDonHangSchema, "ChiTietDonHang");
exports.default = ChiTietDonHang;
