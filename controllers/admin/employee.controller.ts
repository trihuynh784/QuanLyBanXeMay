import { Request, Response } from "express";
import NhanVien from "../../models/NhanVien";
import "../../models/VaiTro";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await NhanVien.find().populate({ path: "vaiTroId" });
    return res.status(200).json({
      message: "Get all employees successfully",
      data: employees.map((emp: any) => ({
        _id: emp._id,
        tenDangNhap: emp.tenDangNhap,
        hoTen: emp.hoTen,
        soDienThoai: emp.soDienThoai,
        email: emp.email,
        trangThai: emp.trangThai,
        vaiTro: emp.vaiTroId ? {
          _id: emp.vaiTroId._id,
          tenVaiTro: emp.vaiTroId.tenVaiTro,
        } : null,
      })),
    });
  } catch (error) {
    console.error("Error when getting employees! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await NhanVien.findById(id).populate({ path: "vaiTroId" });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const emp: any = employee;
    return res.status(200).json({
      message: "Get employee successfully",
      data: {
        _id: emp._id,
        tenDangNhap: emp.tenDangNhap,
        hoTen: emp.hoTen,
        soDienThoai: emp.soDienThoai,
        email: emp.email,
        trangThai: emp.trangThai,
        vaiTro: emp.vaiTroId ? {
          _id: emp.vaiTroId._id,
          tenVaiTro: emp.vaiTroId.tenVaiTro,
        } : null,
      },
    });
  } catch (error) {
    console.error("Error when getting employee by ID! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { hoTen, soDienThoai, email, vaiTroId } = req.body;

    const employee = await NhanVien.findByIdAndUpdate(
      id,
      { hoTen, soDienThoai, email, vaiTroId },
      { returnDocument: "after" }
    ).populate({ path: "vaiTroId" });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const emp: any = employee;
    return res.status(200).json({
      message: "Update employee successfully",
      data: {
        _id: emp._id,
        tenDangNhap: emp.tenDangNhap,
        hoTen: emp.hoTen,
        soDienThoai: emp.soDienThoai,
        email: emp.email,
        trangThai: emp.trangThai,
        vaiTro: emp.vaiTroId ? {
          _id: emp.vaiTroId._id,
          tenVaiTro: emp.vaiTroId.tenVaiTro,
        } : null,
      },
    });
  } catch (error) {
    console.error("Error when updating employee! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await NhanVien.findById(id).populate({ path: "vaiTroId" });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    employee.trangThai = !employee.trangThai;
    await employee.save();
    
    const emp: any = employee;
    return res.status(200).json({
      message: "Change employee status successfully",
      data: {
        _id: emp._id,
        tenDangNhap: emp.tenDangNhap,
        hoTen: emp.hoTen,
        soDienThoai: emp.soDienThoai,
        email: emp.email,
        trangThai: emp.trangThai,
        vaiTro: emp.vaiTroId ? {
          _id: emp.vaiTroId._id,
          tenVaiTro: emp.vaiTroId.tenVaiTro,
        } : null,
      },
    });
  } catch (error) {
    console.error("Error when changing employee status! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
