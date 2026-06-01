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
exports.changeStatus = exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const NhanVien_1 = __importDefault(require("../../models/NhanVien"));
require("../../models/VaiTro");
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield NhanVien_1.default.find().populate({ path: "vaiTroId" });
        return res.status(200).json({
            message: "Get all employees successfully",
            data: employees.map((emp) => ({
                _id: emp._id,
                tenDangNhap: emp.tenDangNhap,
                hoTen: emp.hoTen,
                soDienThoai: emp.soDienThoai,
                email: emp.email,
                trangThai: emp.trangThai,
                vaiTro: emp.vaiTroId ? {
                    _id: emp.vaiTroId._id,
                    tenVaiTro: emp.vaiTroId.tenVaiTro,
                } : null,
            })),
        });
    }
    catch (error) {
        console.error("Error when getting employees! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employee = yield NhanVien_1.default.findById(id).populate({ path: "vaiTroId" });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const emp = employee;
        return res.status(200).json({
            message: "Get employee successfully",
            data: {
                _id: emp._id,
                tenDangNhap: emp.tenDangNhap,
                hoTen: emp.hoTen,
                soDienThoai: emp.soDienThoai,
                email: emp.email,
                trangThai: emp.trangThai,
                vaiTro: emp.vaiTroId ? {
                    _id: emp.vaiTroId._id,
                    tenVaiTro: emp.vaiTroId.tenVaiTro,
                } : null,
            },
        });
    }
    catch (error) {
        console.error("Error when getting employee by ID! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { hoTen, soDienThoai, email, vaiTroId } = req.body;
        const employee = yield NhanVien_1.default.findByIdAndUpdate(id, { hoTen, soDienThoai, email, vaiTroId }, { returnDocument: "after" }).populate({ path: "vaiTroId" });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const emp = employee;
        return res.status(200).json({
            message: "Update employee successfully",
            data: {
                _id: emp._id,
                tenDangNhap: emp.tenDangNhap,
                hoTen: emp.hoTen,
                soDienThoai: emp.soDienThoai,
                email: emp.email,
                trangThai: emp.trangThai,
                vaiTro: emp.vaiTroId ? {
                    _id: emp.vaiTroId._id,
                    tenVaiTro: emp.vaiTroId.tenVaiTro,
                } : null,
            },
        });
    }
    catch (error) {
        console.error("Error when updating employee! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateEmployee = updateEmployee;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employee = yield NhanVien_1.default.findById(id).populate({ path: "vaiTroId" });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        employee.trangThai = !employee.trangThai;
        yield employee.save();
        const emp = employee;
        return res.status(200).json({
            message: "Change employee status successfully",
            data: {
                _id: emp._id,
                tenDangNhap: emp.tenDangNhap,
                hoTen: emp.hoTen,
                soDienThoai: emp.soDienThoai,
                email: emp.email,
                trangThai: emp.trangThai,
                vaiTro: emp.vaiTroId ? {
                    _id: emp.vaiTroId._id,
                    tenVaiTro: emp.vaiTroId.tenVaiTro,
                } : null,
            },
        });
    }
    catch (error) {
        console.error("Error when changing employee status! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.changeStatus = changeStatus;
