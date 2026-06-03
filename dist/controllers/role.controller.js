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
exports.deleteRole = exports.updateRole = exports.addRole = exports.index = void 0;
const VaiTro_1 = __importDefault(require("../models/VaiTro"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield VaiTro_1.default.find();
        return res.status(200).json({
            message: "Get all roles successfully",
            data: roles,
        });
    }
    catch (error) {
        console.error("Error when getting roles! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.index = index;
const addRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenVaiTro } = req.body;
        if (!tenVaiTro) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newRole = new VaiTro_1.default({ tenVaiTro });
        yield newRole.save();
        return res.status(201).json({
            message: "Add role successfully",
            data: newRole,
        });
    }
    catch (error) {
        console.error("Error when adding role! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addRole = addRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { tenVaiTro } = req.body;
        if (!tenVaiTro) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const role = yield VaiTro_1.default.findByIdAndUpdate(id, { tenVaiTro }, { returnDocument: "after" });
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        return res.status(200).json({
            message: "Update role successfully",
            data: role,
        });
    }
    catch (error) {
        console.error("Error when updating role! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield VaiTro_1.default.findByIdAndDelete(id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        return res.status(200).json({
            message: "Delete role successfully",
            data: role,
        });
    }
    catch (error) {
        console.error("Error when deleting role! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteRole = deleteRole;
