import { Request, Response } from "express";
import Xe from "../models/Xe";
import "../models/DongXe";
import "../models/LoaiXe"

export const index = async (req: Request, res: Response) => {
  try {
    const objectFind = {};

    const vehicles =
      (await Xe.find(objectFind).populate({
        path: "dongXeId",
        populate: { path: "loaiXeId" },
      })) ?? [];

    return res.status(200).json({
      message: "Get all vehicles successfully",
      data: vehicles,
    });
  } catch (error) {
    console.error("Error when get list of vehicles! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const vehicleDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vehicle = await Xe.findById(id).populate({ path: "dongXeId" });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({
      message: "Get vehicle detail successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("Error when get vehicle detail! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
