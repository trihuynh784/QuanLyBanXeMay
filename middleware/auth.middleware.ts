import { Request, Response, NextFunction } from "express";
import KhachHang from "../models/KhachHang";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader && authHeader.split(" ")[1];

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