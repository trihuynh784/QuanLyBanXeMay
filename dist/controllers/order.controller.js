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
exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const DonHang_1 = __importDefault(require("../models/DonHang"));
const ChiTietDonHang_1 = __importDefault(require("../models/ChiTietDonHang"));
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield DonHang_1.default.find({ khachHangId: req.user._id })
            .populate({
            path: "khachHangId",
            select: "hoTen cccd email soDienThoai diaChi",
        })
            .lean();
        const orderIds = orders.map((order) => order._id);
        const details = yield ChiTietDonHang_1.default.find({ donHangId: { $in: orderIds } })
            .populate({
            path: "xeId",
            populate: [
                {
                    path: "dongXeId",
                    select: "tenDongXe",
                    populate: [
                        {
                            path: "loaiXeId",
                            select: "tenLoaiXe",
                        },
                    ],
                },
            ],
        })
            .lean();
        const formattedOrders = orders.map((order) => {
            const detail = details.find((d) => { var _a, _b; return ((_a = d.donHangId) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = order._id) === null || _b === void 0 ? void 0 : _b.toString()); });
            return {
                _id: order._id,
                ngayDat: order.ngayDat,
                tongTien: order.tongTien,
                trangThaiDonHang: order.trangThaiDonHang,
                khachHang: order.khachHangId,
                chiTiet: detail ? {
                    _id: detail._id,
                    donHangId: detail.donHangId,
                    giaBan: detail.giaBan,
                    xe: detail.xeId ? {
                        _id: detail.xeId._id,
                        soKhung: detail.xeId.soKhung,
                        soMay: detail.xeId.soMay,
                        hinhAnh: detail.xeId.hinhAnh,
                        mauSac: detail.xeId.mauSac,
                        namSanXuat: detail.xeId.namSanXuat,
                        trangThaiXe: detail.xeId.trangThaiXe,
                        dongXe: detail.xeId.dongXeId ? {
                            _id: detail.xeId.dongXeId._id,
                            tenDongXe: detail.xeId.dongXeId.tenDongXe,
                            loaiXe: detail.xeId.dongXeId.loaiXeId ? {
                                _id: detail.xeId.dongXeId.loaiXeId._id,
                                tenLoaiXe: detail.xeId.dongXeId.loaiXeId.tenLoaiXe,
                            } : null
                        } : null
                    } : null
                } : null,
            };
        });
        return res.status(200).json({
            message: "Get all orders successfully",
            data: formattedOrders,
        });
    }
    catch (error) {
        console.error("Error when getting all orders: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield DonHang_1.default.findOne({ _id: id, khachHangId: req.user._id })
            .populate({
            path: "khachHangId",
            select: "hoTen cccd email soDienThoai diaChi",
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const details = yield ChiTietDonHang_1.default.find({ donHangId: id }).populate({
            path: "xeId",
            populate: [
                {
                    path: "dongXeId",
                    select: "tenDongXe",
                    populate: [
                        {
                            path: "loaiXeId",
                            select: "tenLoaiXe",
                        },
                    ],
                },
            ],
        });
        return res.status(200).json({
            message: "Get order successfully",
            data: {
                _id: order._id,
                ngayDat: order.ngayDat,
                tongTien: order.tongTien,
                trangThaiDonHang: order.trangThaiDonHang,
                khachHang: order.khachHangId,
                chiTiet: details.map((detail) => ({
                    _id: detail._id,
                    donHangId: detail.donHangId,
                    giaBan: detail.giaBan,
                    xe: detail.xeId ? {
                        _id: detail.xeId._id,
                        soKhung: detail.xeId.soKhung,
                        soMay: detail.xeId.soMay,
                        hinhAnh: detail.xeId.hinhAnh,
                        mauSac: detail.xeId.mauSac,
                        namSanXuat: detail.xeId.namSanXuat,
                        trangThaiXe: detail.xeId.trangThaiXe,
                        dongXe: detail.xeId.dongXeId ? {
                            _id: detail.xeId.dongXeId._id,
                            tenDongXe: detail.xeId.dongXeId.tenDongXe,
                            loaiXe: detail.xeId.dongXeId.loaiXeId ? {
                                _id: detail.xeId.dongXeId.loaiXeId._id,
                                tenLoaiXe: detail.xeId.dongXeId.loaiXeId.tenLoaiXe,
                            } : null
                        } : null
                    } : null
                })),
            },
        });
    }
    catch (error) {
        console.error("Error when getting order by id: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getOrderById = getOrderById;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trangThaiDonHang, chiTiet } = req.body;
        const khachHangId = req.user._id;
        if (!trangThaiDonHang ||
            !chiTiet ||
            !chiTiet.xeId ||
            !chiTiet.giaBan) {
            return res
                .status(400)
                .json({ message: "Missing required fields or chiTiet is invalid" });
        }
        const tongTien = Number(chiTiet.giaBan);
        const newOrder = new DonHang_1.default({
            khachHangId,
            tongTien,
            trangThaiDonHang,
        });
        const savedOrder = yield newOrder.save();
        const newChiTiet = new ChiTietDonHang_1.default({
            donHangId: savedOrder._id,
            xeId: chiTiet.xeId,
            giaBan: chiTiet.giaBan,
        });
        yield newChiTiet.save();
        return res.status(201).json({
            message: "Create order successfully",
            data: {
                _id: savedOrder._id,
                khachHangId: savedOrder.khachHangId,
                tongTien: savedOrder.tongTien,
                trangThaiDonHang: savedOrder.trangThaiDonHang,
                ngayDat: savedOrder.ngayDat,
            },
        });
    }
    catch (error) {
        console.error("Error when creating order: " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createOrder = createOrder;
