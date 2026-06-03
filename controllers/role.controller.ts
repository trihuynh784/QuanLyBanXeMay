import { Request, Response } from "express";
import VaiTro from "../models/VaiTro";

export const index = async (req: Request, res: Response) => {
  try {
    const roles = await VaiTro.find();
    return res.status(200).json({
      message: "Get all roles successfully",
      data: roles,
    });
  } catch (error) {
    console.error("Error when getting roles! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addRole = async (req: Request, res: Response) => {
  try {
    const { tenVaiTro } = req.body;

    if (!tenVaiTro) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRole = new VaiTro({ tenVaiTro });
    await newRole.save();

    return res.status(201).json({
      message: "Add role successfully",
      data: newRole,
    });
  } catch (error) {
    console.error("Error when adding role! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tenVaiTro } = req.body;

    if (!tenVaiTro) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const role = await VaiTro.findByIdAndUpdate(
      id,
      { tenVaiTro },
      { returnDocument: "after" }
    );

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({
      message: "Update role successfully",
      data: role,
    });
  } catch (error) {
    console.error("Error when updating role! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const role = await VaiTro.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({
      message: "Delete role successfully",
      data: role,
    });
  } catch (error) {
    console.error("Error when deleting role! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
