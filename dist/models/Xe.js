"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const XeSchema = new mongoose_1.default.Schema({
    soKhung: {
        type: String,
        required: true,
        unique: true,
    },
    soMay: {
        type: String,
        required: true,
        unique: true,
    },
    dongXeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "DongXe",
        required: true,
    },
    mauSac: {
        type: String,
        required: true,
    },
    namSanXuat: {
        type: Number,
        required: true,
    },
    trangThaiXe: {
        type: String,
        enum: ["ConHang", "DatCoc", "DaBan"],
        default: "ConHang",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Xe = mongoose_1.default.model("Xe", XeSchema, "Xe");
exports.default = Xe;
