"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VaiTroSchema = new mongoose_1.default.Schema({
    tenVaiTro: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const VaiTro = mongoose_1.default.model("VaiTro", VaiTroSchema, "VaiTro");
exports.default = VaiTro;
