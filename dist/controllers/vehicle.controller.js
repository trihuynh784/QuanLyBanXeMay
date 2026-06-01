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
exports.deleteVehicle = exports.addVehicle = exports.vehicleDetail = exports.index = void 0;
const Xe_1 = __importDefault(require("../models/Xe"));
require("../models/DongXe");
require("../models/LoaiXe");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const objectFind = { deleted: false };
        const vehicles = (_a = (yield Xe_1.default.find(objectFind).populate({
            path: "dongXeId",
            populate: { path: "loaiXeId" },
        }))) !== null && _a !== void 0 ? _a : [];
        return res.status(200).json({
            message: "Get all vehicles successfully",
            data: vehicles,
        });
    }
    catch (error) {
        console.error("Error when get list of vehicles! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.index = index;
const vehicleDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const vehicle = yield Xe_1.default.findOne({
            id,
            deleted: false,
        }).populate({ path: "dongXeId" });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json({
            message: "Get vehicle detail successfully",
            data: vehicle,
        });
    }
    catch (error) {
        console.error("Error when get vehicle detail! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.vehicleDetail = vehicleDetail;
const addVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { soKhung, soMay, dongXeId, mauSac, namSanXuat, trangThaiXe } = req.body;
        if (!soKhung || !soMay || !dongXeId || !mauSac || !namSanXuat) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingVehicle = yield Xe_1.default.findOne({
            $or: [{ soKhung }, { soMay }],
        });
        if (existingVehicle) {
            return res
                .status(400)
                .json({ message: "soKhung or soMay already exists" });
        }
        const newVehicle = new Xe_1.default({
            soKhung,
            soMay,
            dongXeId,
            mauSac,
            namSanXuat,
            trangThaiXe: trangThaiXe || "ConHang",
            deleted: false,
        });
        yield newVehicle.save();
        return res.status(201).json({
            message: "Add vehicle successfully",
            data: newVehicle,
        });
    }
    catch (error) {
        console.error("Error when adding vehicle! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addVehicle = addVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const vehicle = yield Xe_1.default.findByIdAndUpdate(id, { deleted: true }, { returnDocument: "after" });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json({
            message: "Delete vehicle successfully",
            data: vehicle,
        });
    }
    catch (error) {
        console.error("Error when deleting vehicle! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteVehicle = deleteVehicle;
