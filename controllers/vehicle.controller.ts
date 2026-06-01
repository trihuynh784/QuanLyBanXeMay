import { Request, Response } from "express";
import Xe from "../models/Xe";
import "../models/DongXe";
import "../models/LoaiXe";

export const index = async (req: Request, res: Response) => {
  try {
    const objectFind = { deleted: false };

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

    const vehicle = await Xe.findOne({
      _id: id,
      deleted: false,
    }).populate({ path: "dongXeId" });

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

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const { soKhung, soMay, dongXeId, mauSac, namSanXuat, trangThaiXe } =
      req.body;

    if (!soKhung || !soMay || !dongXeId || !mauSac || !namSanXuat) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingVehicle = await Xe.findOne({
      $or: [{ soKhung }, { soMay }],
    });

    if (existingVehicle) {
      return res
        .status(400)
        .json({ message: "soKhung or soMay already exists" });
    }

    const newVehicle = new Xe({
      soKhung,
      soMay,
      dongXeId,
      mauSac,
      namSanXuat,
      trangThaiXe: trangThaiXe || "ConHang",
      deleted: false,
    });

    await newVehicle.save();

    return res.status(201).json({
      message: "Add vehicle successfully",
      data: newVehicle,
    });
  } catch (error) {
    console.error("Error when adding vehicle! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const vehicle = await Xe.findByIdAndUpdate(
      id,
      { deleted: true },
      { returnDocument: "after" },
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({
      message: "Delete vehicle successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("Error when deleting vehicle! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
