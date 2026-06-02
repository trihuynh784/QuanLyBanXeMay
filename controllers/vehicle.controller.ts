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
      data: vehicles.map((v: any) => ({
        _id: v._id,
        soKhung: v.soKhung,
        soMay: v.soMay,
        hinhAnh: v.hinhAnh,
        dongXe: v.dongXeId
          ? {
              _id: v.dongXeId._id,
              loaiXe: v.dongXeId.loaiXeId
                ? {
                    _id: v.dongXeId.loaiXeId._id,
                    tenLoaiXe: v.dongXeId.loaiXeId.tenLoaiXe,
                    moTa: v.dongXeId.loaiXeId.moTa,
                  }
                : null,
              tenDongXe: v.dongXeId.tenDongXe,
              namSanXuat: v.dongXeId.namSanXuat,
              giaNiemYet: v.dongXeId.giaNiemYet,
              dungTichXiLanh: v.dongXeId.dungTichXiLanh,
              mucTieuThuNhienLieu: v.dongXeId.mucTieuThuNhienLieu,
              moTa: v.dongXeId.moTa,
            }
          : null,
        mauSac: v.mauSac,
        namSanXuat: v.namSanXuat,
        trangThaiXe: v.trangThaiXe,
      })),
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

    const v: any = vehicle;
    return res.status(200).json({
      message: "Get vehicle detail successfully",
      data: {
        _id: v._id,
        soKhung: v.soKhung,
        soMay: v.soMay,
        hinhAnh: v.hinhAnh,
        dongXe: v.dongXeId
          ? {
              _id: v.dongXeId._id,
              loaiXeId: v.dongXeId.loaiXeId,
              tenDongXe: v.dongXeId.tenDongXe,
              namSanXuat: v.dongXeId.namSanXuat,
              giaNiemYet: v.dongXeId.giaNiemYet,
              dungTichXiLanh: v.dongXeId.dungTichXiLanh,
              mucTieuThuNhienLieu: v.dongXeId.mucTieuThuNhienLieu,
              moTa: v.dongXeId.moTa,
            }
          : null,
        mauSac: v.mauSac,
        namSanXuat: v.namSanXuat,
        trangThaiXe: v.trangThaiXe,
      },
    });
  } catch (error) {
    console.error("Error when get vehicle detail! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const {
      soKhung,
      soMay,
      dongXeId,
      mauSac,
      namSanXuat,
      trangThaiXe,
      hinhAnh,
    } = req.body;

    if (!soKhung || !soMay || !dongXeId || !mauSac || !namSanXuat || !hinhAnh) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingVehicle = await Xe.findOne({
      $or: [{ soKhung }, { soMay }],
      deleted: false,
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
      hinhAnh,
      deleted: false,
    });

    await newVehicle.save();

    return res.status(201).json({
      message: "Add vehicle successfully",
      data: {
        _id: newVehicle._id,
        soKhung: newVehicle.soKhung,
        soMay: newVehicle.soMay,
        hinhAnh: newVehicle.hinhAnh,
        dongXeId: newVehicle.dongXeId,
        mauSac: newVehicle.mauSac,
        namSanXuat: newVehicle.namSanXuat,
        trangThaiXe: newVehicle.trangThaiXe,
      },
    });
  } catch (error) {
    console.error("Error when adding vehicle! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      soKhung,
      soMay,
      dongXeId,
      mauSac,
      namSanXuat,
      trangThaiXe,
      hinhAnh,
    } = req.body;

    if (!soKhung || !soMay || !dongXeId || !mauSac || !namSanXuat) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const vehicle = await Xe.findByIdAndUpdate(
      id,
      { soKhung, soMay, dongXeId, mauSac, namSanXuat, trangThaiXe, hinhAnh },
      { returnDocument: "after" },
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({
      message: "Update vehicle successfully",
      data: {
        _id: vehicle._id,
        soKhung: vehicle.soKhung,
        soMay: vehicle.soMay,
        hinhAnh: vehicle.hinhAnh,
        dongXeId: vehicle.dongXeId,
        mauSac: vehicle.mauSac,
        namSanXuat: vehicle.namSanXuat,
        trangThaiXe: vehicle.trangThaiXe,
      },
    });
  } catch (error) {
    console.error("Error when updating vehicle! " + error);
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
      data: {
        _id: vehicle._id,
        soKhung: vehicle.soKhung,
        soMay: vehicle.soMay,
        hinhAnh: vehicle.hinhAnh,
        dongXeId: vehicle.dongXeId,
        mauSac: vehicle.mauSac,
        namSanXuat: vehicle.namSanXuat,
        trangThaiXe: vehicle.trangThaiXe,
      },
    });
  } catch (error) {
    console.error("Error when deleting vehicle! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
