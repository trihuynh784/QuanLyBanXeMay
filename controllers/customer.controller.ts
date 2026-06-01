import { Request, Response } from "express";
import KhachHang from "../models/KhachHang";

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { hoTen, cccd, soDienThoai, email, diaChi, avatar } = req.body;

    const customer = await KhachHang.findByIdAndUpdate(
      id,
      { hoTen, cccd, soDienThoai, email, diaChi, avatar },
      { returnDocument: "after" },
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({
      message: "Update customer successfully",
      data: {
        _id: customer._id,
        tenDangNhap: customer.tenDangNhap,
        hoTen: customer.hoTen,
        cccd: customer.cccd,
        soDienThoai: customer.soDienThoai,
        email: customer.email,
        diaChi: customer.diaChi,
        trangThai: customer.trangThai,
        avatar: customer.avatar,
      },
    });
  } catch (error) {
    console.error("Error when updating customer! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await KhachHang.find();
    return res.status(200).json({
      message: "Get all customers successfully",
      data: customers.map((customer) => ({
        _id: customer._id,
        tenDangNhap: customer.tenDangNhap,
        hoTen: customer.hoTen,
        cccd: customer.cccd,
        soDienThoai: customer.soDienThoai,
        email: customer.email,
        diaChi: customer.diaChi,
        trangThai: customer.trangThai,
        avatar: customer.avatar,
      })),
    });
  } catch (error) {
    console.error("Error when getting customers! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await KhachHang.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({
      message: "Get customer successfully",
      data: {
        _id: customer._id,
        tenDangNhap: customer.tenDangNhap,
        hoTen: customer.hoTen,
        cccd: customer.cccd,
        soDienThoai: customer.soDienThoai,
        email: customer.email,
        diaChi: customer.diaChi,
        trangThai: customer.trangThai,
        avatar: customer.avatar,
      },
    });
  } catch (error) {
    console.error("Error when getting customer by ID! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await KhachHang.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.trangThai = !customer.trangThai;
    await customer.save();
    return res.status(200).json({
      message: "Change customer status successfully",
      data: {
        _id: customer._id,
        tenDangNhap: customer.tenDangNhap,
        hoTen: customer.hoTen,
        cccd: customer.cccd,
        soDienThoai: customer.soDienThoai,
        email: customer.email,
        diaChi: customer.diaChi,
        trangThai: customer.trangThai,
        avatar: customer.avatar,
      },
    });
  } catch (error) {
    console.error("Error when changing customer status! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
