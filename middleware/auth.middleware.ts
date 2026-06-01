import { Request, Response, NextFunction } from "express";
import KhachHang from "../models/KhachHang";
import NhanVien from "../models/NhanVien";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const user = await KhachHang.findOne({ token });

  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  (req as any)["user"] = user;
  next();
};

export const authMiddlewareAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const user = await NhanVien.findOne({ token });

  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  (req as any)["user"] = user;
  next();
};
