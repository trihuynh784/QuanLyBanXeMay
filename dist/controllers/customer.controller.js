"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = void 0;
const KhachHang_1 = __importDefault(require("../models/KhachHang"));
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { hoTen, cccd, soDienThoai, email, diaChi, trangThai, avatar } = req.body;
        const customer = yield KhachHang_1.default.findByIdAndUpdate(id, { hoTen, cccd, soDienThoai, email, diaChi, trangThai, avatar }, { returnDocument: "after" });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        return res.status(200).json({
            message: "Update customer successfully",
            data: customer,
        });
    }
    catch (error) {
        console.error("Error when updating customer! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateCustomer = updateCustomer;
