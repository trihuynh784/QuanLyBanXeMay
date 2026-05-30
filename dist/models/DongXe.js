"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DongXeSchema = new mongoose_1.default.Schema({
    tenHang: {
        type: String,
        required: true,
    },
    tenDongXe: {
        type: String,
        required: true,
    },
    namSanXuat: {
        type: Number,
        required: true,
    },
    giaNiemYet: {
        type: Number,
        required: true,
    },
    moTa: {
        type: String,
    },
}, {
    timestamps: true,
});
const DongXe = mongoose_1.default.model("DongXe", DongXeSchema, "DongXe");
exports.default = DongXe;
