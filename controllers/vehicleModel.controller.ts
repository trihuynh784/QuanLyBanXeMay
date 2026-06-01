import { Request, Response } from "express";
import DongXe from "../models/DongXe";

export const index = async (req: Request, res: Response) => {
  try {
    const models = await DongXe.find({ deleted: false }).populate({
      path: "loaiXeId",
    });

    return res.status(200).json({
      message: "Get list of vehicle models successfully",
      data: models.map((mod: any) => ({
        _id: mod._id,
        loaiXe: mod.loaiXeId ? {
          _id: mod.loaiXeId._id,
          tenLoaiXe: mod.loaiXeId.tenLoaiXe,
          moTa: mod.loaiXeId.moTa,
        } : null,
        tenDongXe: mod.tenDongXe,
        namSanXuat: mod.namSanXuat,
        giaNiemYet: mod.giaNiemYet,
        dungTichXiLanh: mod.dungTichXiLanh,
        mucTieuThuNhienLieu: mod.mucTieuThuNhienLieu,
        moTa: mod.moTa,
      })),
    });
  } catch (error) {
    console.error("Error when getting vehicle models! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addModel = async (req: Request, res: Response) => {
  try {
    const {
      loaiXeId,
      tenDongXe,
      namSanXuat,
      giaNiemYet,
      dungTichXiLanh,
      mucTieuThuNhienLieu,
      moTa,
    } = req.body;

    if (
      !loaiXeId ||
      !tenDongXe ||
      !namSanXuat ||
      !giaNiemYet ||
      !dungTichXiLanh
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingModel = await DongXe.findOne({ tenDongXe, deleted: false });
    if (existingModel) {
      return res
        .status(400)
        .json({ message: "Vehicle model name already exists" });
    }

    const newModel = new DongXe({
      loaiXeId,
      tenDongXe,
      namSanXuat,
      giaNiemYet,
      dungTichXiLanh,
      mucTieuThuNhienLieu,
      moTa,
      deleted: false,
    });

    await newModel.save();

    return res.status(201).json({
      message: "Add vehicle model successfully",
      data: {
        _id: newModel._id,
        loaiXeId: newModel.loaiXeId,
        tenDongXe: newModel.tenDongXe,
        namSanXuat: newModel.namSanXuat,
        giaNiemYet: newModel.giaNiemYet,
        dungTichXiLanh: newModel.dungTichXiLanh,
        mucTieuThuNhienLieu: newModel.mucTieuThuNhienLieu,
        moTa: newModel.moTa,
      },
    });
  } catch (error) {
    console.error("Error when adding vehicle model! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteModel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Tìm và cập nhật trạng thái deleted = true, sử dụng returnDocument theo chuẩn mới
    const model = await DongXe.findByIdAndUpdate(
      id,
      { deleted: true },
      { returnDocument: "after" },
    );

    // Nếu không tìm thấy dòng xe ứng với ID truyền vào
    if (!model) {
      return res.status(404).json({ message: "Vehicle model not found" });
    }

    return res.status(200).json({
      message: "Delete vehicle model successfully",
      data: {
        _id: model._id,
        loaiXeId: model.loaiXeId,
        tenDongXe: model.tenDongXe,
        namSanXuat: model.namSanXuat,
        giaNiemYet: model.giaNiemYet,
        dungTichXiLanh: model.dungTichXiLanh,
        mucTieuThuNhienLieu: model.mucTieuThuNhienLieu,
        moTa: model.moTa,
      },
    });
  } catch (error) {
    console.error("Error when deleting vehicle model! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
