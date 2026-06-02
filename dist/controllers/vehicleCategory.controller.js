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
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.index = void 0;
const LoaiXe_1 = __importDefault(require("../models/LoaiXe"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield LoaiXe_1.default.find({ deleted: false });
        return res.status(200).json({
            message: "Get list of vehicle categories successfully",
            data: categories.map((cat) => ({
                _id: cat._id,
                tenLoaiXe: cat.tenLoaiXe,
                moTa: cat.moTa,
            })),
        });
    }
    catch (error) {
        console.error("Error when getting vehicle categories! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.index = index;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenLoaiXe, moTa } = req.body;
        if (!tenLoaiXe) {
            return res
                .status(400)
                .json({ message: "Missing required field: tenLoaiXe" });
        }
        const existingCategory = yield LoaiXe_1.default.findOne({
            tenLoaiXe,
            deleted: false,
        });
        if (existingCategory) {
            return res
                .status(400)
                .json({ message: "Vehicle category already exists" });
        }
        const newCategory = new LoaiXe_1.default({
            tenLoaiXe,
            moTa,
            deleted: false,
        });
        yield newCategory.save();
        return res.status(201).json({
            message: "Add vehicle category successfully",
            data: {
                _id: newCategory._id,
                tenLoaiXe: newCategory.tenLoaiXe,
                moTa: newCategory.moTa,
            },
        });
    }
    catch (error) {
        console.error("Error when adding vehicle category! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { tenLoaiXe, moTa } = req.body;
        if (!tenLoaiXe) {
            return res
                .status(400)
                .json({ message: "Missing required field: tenLoaiXe" });
        }
        const existingCategory = yield LoaiXe_1.default.findOne({
            tenLoaiXe,
            _id: { $ne: id },
            deleted: false,
        });
        if (existingCategory) {
            return res
                .status(400)
                .json({ message: "Vehicle category already exists" });
        }
        const category = yield LoaiXe_1.default.findByIdAndUpdate(id, { tenLoaiXe, moTa }, { returnDocument: "after" });
        if (!category || category.deleted) {
            return res.status(404).json({ message: "Vehicle category not found" });
        }
        return res.status(200).json({
            message: "Update vehicle category successfully",
            data: {
                _id: category._id,
                tenLoaiXe: category.tenLoaiXe,
                moTa: category.moTa,
            },
        });
    }
    catch (error) {
        console.error("Error when updating vehicle category! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield LoaiXe_1.default.findByIdAndUpdate(id, { deleted: true }, { returnDocument: "after" });
        if (!category) {
            return res.status(404).json({ message: "Vehicle category not found" });
        }
        return res.status(200).json({
            message: "Delete vehicle category successfully",
            data: {
                _id: category._id,
                tenLoaiXe: category.tenLoaiXe,
                moTa: category.moTa,
            },
        });
    }
    catch (error) {
        console.error("Error when deleting vehicle category! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteCategory = deleteCategory;
