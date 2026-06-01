"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LoaiXeSchema = new mongoose_1.default.Schema({
    tenLoaiXe: {
        type: String,
        required: true,
        unique: true,
    },
    moTa: String,
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const LoaiXe = mongoose_1.default.model("LoaiXe", LoaiXeSchema, "LoaiXe");
exports.default = LoaiXe;
