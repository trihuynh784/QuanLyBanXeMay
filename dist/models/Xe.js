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
    trangThaiXe: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Xe = mongoose_1.default.model("Xe", XeSchema, "Xe");
exports.default = Xe;
