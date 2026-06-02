import { Request, Response } from "express";
import LoaiXe from "../models/LoaiXe";

export const index = async (req: Request, res: Response) => {
  try {
    const categories = await LoaiXe.find({ deleted: false });

    return res.status(200).json({
      message: "Get list of vehicle categories successfully",
      data: categories.map((cat: any) => ({
        _id: cat._id,
        tenLoaiXe: cat.tenLoaiXe,
        moTa: cat.moTa,
      })),
    });
  } catch (error) {
    console.error("Error when getting vehicle categories! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { tenLoaiXe, moTa } = req.body;

    if (!tenLoaiXe) {
      return res
        .status(400)
        .json({ message: "Missing required field: tenLoaiXe" });
    }

    const existingCategory = await LoaiXe.findOne({
      tenLoaiXe,
      deleted: false,
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Vehicle category already exists" });
    }

    const newCategory = new LoaiXe({
      tenLoaiXe,
      moTa,
      deleted: false,
    });

    await newCategory.save();

    return res.status(201).json({
      message: "Add vehicle category successfully",
      data: {
        _id: newCategory._id,
        tenLoaiXe: newCategory.tenLoaiXe,
        moTa: newCategory.moTa,
      },
    });
  } catch (error) {
    console.error("Error when adding vehicle category! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tenLoaiXe, moTa } = req.body;

    if (!tenLoaiXe) {
      return res
        .status(400)
        .json({ message: "Missing required field: tenLoaiXe" });
    }

    const existingCategory = await LoaiXe.findOne({
      tenLoaiXe,
      _id: { $ne: id },
      deleted: false,
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Vehicle category already exists" });
    }

    const category = await LoaiXe.findByIdAndUpdate(
      id,
      { tenLoaiXe, moTa },
      { returnDocument: "after" }
    );

    if (!category || category.deleted) {
      return res.status(404).json({ message: "Vehicle category not found" });
    }

    return res.status(200).json({
      message: "Update vehicle category successfully",
      data: {
        _id: category._id,
        tenLoaiXe: category.tenLoaiXe,
        moTa: category.moTa,
      },
    });
  } catch (error) {
    console.error("Error when updating vehicle category! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await LoaiXe.findByIdAndUpdate(
      id,
      { deleted: true },
      { returnDocument: "after" },
    );

    if (!category) {
      return res.status(404).json({ message: "Vehicle category not found" });
    }

    return res.status(200).json({
      message: "Delete vehicle category successfully",
      data: {
        _id: category._id,
        tenLoaiXe: category.tenLoaiXe,
        moTa: category.moTa,
      },
    });
  } catch (error) {
    console.error("Error when deleting vehicle category! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
