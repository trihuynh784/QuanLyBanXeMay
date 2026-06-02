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
exports.deleteModel = exports.updateModel = exports.addModel = exports.index = void 0;
const DongXe_1 = __importDefault(require("../models/DongXe"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const models = yield DongXe_1.default.find({ deleted: false }).populate({
            path: "loaiXeId",
        });
        return res.status(200).json({
            message: "Get list of vehicle models successfully",
            data: models.map((mod) => ({
                _id: mod._id,
                loaiXe: mod.loaiXeId ? {
                    _id: mod.loaiXeId._id,
                    tenLoaiXe: mod.loaiXeId.tenLoaiXe,
                    moTa: mod.loaiXeId.moTa,
                } : null,
                tenDongXe: mod.tenDongXe,
                namSanXuat: mod.namSanXuat,
                giaNiemYet: mod.giaNiemYet,
                dungTichXiLanh: mod.dungTichXiLanh,
                mucTieuThuNhienLieu: mod.mucTieuThuNhienLieu,
                moTa: mod.moTa,
            })),
        });
    }
    catch (error) {
        console.error("Error when getting vehicle models! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.index = index;
const addModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loaiXeId, tenDongXe, namSanXuat, giaNiemYet, dungTichXiLanh, mucTieuThuNhienLieu, moTa, } = req.body;
        if (!loaiXeId ||
            !tenDongXe ||
            !namSanXuat ||
            !giaNiemYet ||
            !dungTichXiLanh) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingModel = yield DongXe_1.default.findOne({ tenDongXe, deleted: false });
        if (existingModel) {
            return res
                .status(400)
                .json({ message: "Vehicle model name already exists" });
        }
        const newModel = new DongXe_1.default({
            loaiXeId,
            tenDongXe,
            namSanXuat,
            giaNiemYet,
            dungTichXiLanh,
            mucTieuThuNhienLieu,
            moTa,
            deleted: false,
        });
        yield newModel.save();
        return res.status(201).json({
            message: "Add vehicle model successfully",
            data: {
                _id: newModel._id,
                loaiXeId: newModel.loaiXeId,
                tenDongXe: newModel.tenDongXe,
                namSanXuat: newModel.namSanXuat,
                giaNiemYet: newModel.giaNiemYet,
                dungTichXiLanh: newModel.dungTichXiLanh,
                mucTieuThuNhienLieu: newModel.mucTieuThuNhienLieu,
                moTa: newModel.moTa,
            },
        });
    }
    catch (error) {
        console.error("Error when adding vehicle model! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addModel = addModel;
const updateModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { loaiXeId, tenDongXe, namSanXuat, giaNiemYet, dungTichXiLanh, mucTieuThuNhienLieu, moTa, } = req.body;
        if (!loaiXeId ||
            !tenDongXe ||
            !namSanXuat ||
            !giaNiemYet ||
            !dungTichXiLanh) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingModel = yield DongXe_1.default.findOne({
            tenDongXe,
            _id: { $ne: id },
            deleted: false
        });
        if (existingModel) {
            return res.status(400).json({ message: "Vehicle model name already exists" });
        }
        const model = yield DongXe_1.default.findByIdAndUpdate(id, {
            loaiXeId,
            tenDongXe,
            namSanXuat,
            giaNiemYet,
            dungTichXiLanh,
            mucTieuThuNhienLieu,
            moTa,
        }, { returnDocument: "after" });
        if (!model || model.deleted) {
            return res.status(404).json({ message: "Vehicle model not found" });
        }
        return res.status(200).json({
            message: "Update vehicle model successfully",
            data: {
                _id: model._id,
                loaiXeId: model.loaiXeId,
                tenDongXe: model.tenDongXe,
                namSanXuat: model.namSanXuat,
                giaNiemYet: model.giaNiemYet,
                dungTichXiLanh: model.dungTichXiLanh,
                mucTieuThuNhienLieu: model.mucTieuThuNhienLieu,
                moTa: model.moTa,
            },
        });
    }
    catch (error) {
        console.error("Error when updating vehicle model! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateModel = updateModel;
const deleteModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const model = yield DongXe_1.default.findByIdAndUpdate(id, { deleted: true }, { returnDocument: "after" });
        if (!model) {
            return res.status(404).json({ message: "Vehicle model not found" });
        }
        return res.status(200).json({
            message: "Delete vehicle model successfully",
            data: {
                _id: model._id,
                loaiXeId: model.loaiXeId,
                tenDongXe: model.tenDongXe,
                namSanXuat: model.namSanXuat,
                giaNiemYet: model.giaNiemYet,
                dungTichXiLanh: model.dungTichXiLanh,
                mucTieuThuNhienLieu: model.mucTieuThuNhienLieu,
                moTa: model.moTa,
            },
        });
    }
    catch (error) {
        console.error("Error when deleting vehicle model! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteModel = deleteModel;
