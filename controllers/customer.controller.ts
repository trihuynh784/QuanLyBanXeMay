import { Request, Response } from "express";
import KhachHang from "../models/KhachHang";

export const customerDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const customer = await KhachHang.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    return res.status(200).json({
      message: "Get customer details successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Error when get customer detail! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
