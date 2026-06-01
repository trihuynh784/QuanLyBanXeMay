import { Request, Response } from "express";
import KhachHang from "../models/KhachHang";

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { hoTen, cccd, soDienThoai, email, diaChi, trangThai, avatar } =
      req.body;

    const customer = await KhachHang.findByIdAndUpdate(
      id,
      { hoTen, cccd, soDienThoai, email, diaChi, trangThai, avatar },
      { returnDocument: "after" },
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({
      message: "Update customer successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Error when updating customer! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
