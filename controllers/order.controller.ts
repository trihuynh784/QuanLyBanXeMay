import { Request, Response } from "express";
import DonHang from "../models/DonHang";
import ChiTietDonHang from "../models/ChiTietDonHang";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await DonHang.find()
      .populate({
        path: "khachHangId",
        select: "hoTen cccd email soDienThoai diaChi",
      })
      .populate({
        path: "nhanVienId",
        select: "hoTen soDienThoai email",
      })
      .lean();

    const orderIds = orders.map((order) => order._id);

    const details = await ChiTietDonHang.find({ donHangId: { $in: orderIds } })
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
      const detail = details.find(
        (d) => d.donHangId?.toString() === order._id?.toString(),
      );

      return {
        _id: order._id,
        ngayDat: order.ngayDat,
        tongTien: order.tongTien,
        trangThaiDonHang: order.trangThaiDonHang,
        khachHang: order.khachHangId,
        nhanVien: order.nhanVienId,
        chiTiet: detail ? {
          _id: detail._id,
          donHangId: detail.donHangId,
          giaBan: detail.giaBan,
          xe: detail.xeId ? {
            _id: (detail.xeId as any)._id,
            soKhung: (detail.xeId as any).soKhung,
            soMay: (detail.xeId as any).soMay,
            hinhAnh: (detail.xeId as any).hinhAnh,
            mauSac: (detail.xeId as any).mauSac,
            namSanXuat: (detail.xeId as any).namSanXuat,
            trangThaiXe: (detail.xeId as any).trangThaiXe,
            dongXe: (detail.xeId as any).dongXeId ? {
              _id: (detail.xeId as any).dongXeId._id,
              tenDongXe: (detail.xeId as any).dongXeId.tenDongXe,
              loaiXe: (detail.xeId as any).dongXeId.loaiXeId ? {
                _id: (detail.xeId as any).dongXeId.loaiXeId._id,
                tenLoaiXe: (detail.xeId as any).dongXeId.loaiXeId.tenLoaiXe,
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
  } catch (error) {
    console.error("Error when getting all orders: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await DonHang.findById(id)
      .populate({
        path: "khachHangId",
        select: "hoTen cccd email soDienThoai diaChi",
      })
      .populate({
        path: "nhanVienId",
        select: "hoTen soDienThoai email",
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const details = await ChiTietDonHang.find({ donHangId: id }).populate({
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
        nhanVien: order.nhanVienId,
        chiTiet: details.map((detail: any) => ({
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
  } catch (error) {
    console.error("Error when getting order by id: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { khachHangId, trangThaiDonHang, chiTiet } = req.body;
    const nhanVienId = (req as any).user._id;

    if (
      !khachHangId ||
      !trangThaiDonHang ||
      !chiTiet ||
      !chiTiet.xeId ||
      !chiTiet.giaBan
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields or chiTiet is invalid" });
    }

    const tongTien = Number(chiTiet.giaBan);

    const newOrder = new DonHang({
      khachHangId,
      nhanVienId,
      tongTien,
      trangThaiDonHang,
    });

    const savedOrder = await newOrder.save();

    const newChiTiet = new ChiTietDonHang({
      donHangId: savedOrder._id,
      xeId: chiTiet.xeId,
      giaBan: chiTiet.giaBan,
    });

    await newChiTiet.save();

    return res.status(201).json({
      message: "Create order successfully",
      data: {
        _id: savedOrder._id,
        khachHangId: savedOrder.khachHangId,
        nhanVienId: savedOrder.nhanVienId,
        tongTien: savedOrder.tongTien,
        trangThaiDonHang: savedOrder.trangThaiDonHang,
        ngayDat: savedOrder.ngayDat,
      },
    });
  } catch (error) {
    console.error("Error when creating order: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
