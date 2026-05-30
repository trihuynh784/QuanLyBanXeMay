import { Request, Response } from "express";
import NhanVien from "../models/NhanVien";

export const staffDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const customer = await NhanVien.findById(id).populate("vaiTroId");

    if (!customer) {
      return res.status(404).json({ message: "Staff not found!" });
    }

    return res.status(200).json({
      message: "Get staff details successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Error when get staff detail! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
