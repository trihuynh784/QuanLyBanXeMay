"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DongXeSchema = new mongoose_1.default.Schema({
    loaiXeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "LoaiXe",
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
    dungTichXiLanh: {
        type: Number,
        required: true,
    },
    mucTieuThuNhienLieu: {
        type: Number,
    },
    moTa: String,
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const DongXe = mongoose_1.default.model("DongXe", DongXeSchema, "DongXe");
exports.default = DongXe;
