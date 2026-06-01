import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateRandomString } from "../../helpers/StringGeneration";
import NhanVien from "../../models/NhanVien";
import "../../models/VaiTro";

export const signIn = async (req: Request, res: Response) => {
  const { tenDangNhap, matKhau } = req.body;

  if (!tenDangNhap || !matKhau) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await NhanVien.findOne({ tenDangNhap }).populate({
      path: "vaiTroId",
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = bcrypt.compareSync(matKhau, user.matKhau);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!user.trangThai) {
      return res.status(403).json({ message: "Account is inactive" });
    }

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Sign-in successful",
      user: {
        id: user._id,
        vaiTro: user.vaiTroId,
        tenDangNhap: user.tenDangNhap,
        token: user.token,
        hoTen: user.hoTen,
        soDienThoai: user.soDienThoai,
        email: user.email,
        trangThai: user.trangThai,
      },
    });
  } catch (error) {
    console.error("Error when get SIGN-IN! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const {
    tenDangNhap,
    matKhau,
    vaiTroId,
    hoTen,
    soDienThoai,
    email,
    trangThai,
  } = req.body;

  if (
    !tenDangNhap ||
    !matKhau ||
    !vaiTroId ||
    !hoTen ||
    !soDienThoai ||
    !email ||
    !trangThai
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await NhanVien.findOne({ tenDangNhap });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = bcrypt.hashSync(matKhau, 10);
    const token = generateRandomString(32);
    const newUser = new NhanVien({
      tenDangNhap,
      matKhau: hashedPassword,
      token,
      hoTen,
      soDienThoai,
      email,
      trangThai,
      vaiTroId,
    });
    await newUser.save();
    await newUser.populate({ path: "vaiTroId" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    return res.status(201).json({
      message: "Sign-up successful",
      user: {
        id: newUser._id,
        tenDangNhap: newUser.tenDangNhap,
        token,
        hoTen: newUser.hoTen,
        soDienThoai: newUser.soDienThoai,
        email: newUser.email,
        trangThai: newUser.trangThai,
        vaiTro: newUser.vaiTroId,
      },
    });
  } catch (error) {
    console.error("Error when get SIGN-UP! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Sign-out successful" });
  } catch (error) {
    console.error("Error when get SIGN-OUT! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
