import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateRandomString } from "../helpers/StringGeneration";
import KhachHang from "../models/KhachHang";

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await KhachHang.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.matKhau);

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
        fullName: user.hoTen,
        token: user.token,
        email: user.email,
        phoneNumber: user.soDienThoai,
        address: user.diaChi,
        cccd: user.cccd,
        status: user.trangThai,
      },
    });
  } catch (error) {
    console.error("Error when get SIGN-IN detail! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { username, password, fullName, cccd, phoneNumber, email, address } =
    req.body;

  if (
    !username ||
    !password ||
    !fullName ||
    !cccd ||
    !phoneNumber ||
    !email ||
    !address
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await KhachHang.findOne({ tenDangNhap: username });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const token = generateRandomString(32);
    const newUser = new KhachHang({
      tenDangNhap: username,
      matKhau: hashedPassword,
      token,
      hoTen: fullName,
      cccd,
      soDienThoai: phoneNumber,
      email,
      diaChi: address,
    });
    await newUser.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    return res.status(201).json({
      message: "Sign-up successful",
      user: {
        id: newUser._id,
        fullName: newUser.hoTen,
        token: newUser.token,
        email: newUser.email,
        phoneNumber: newUser.soDienThoai,
        address: newUser.diaChi,
        cccd: newUser.cccd,
        status: newUser.trangThai,
      },
    });
  } catch (error) {
    console.error("Error when get SIGN-UP detail! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    // Perform any necessary cleanup for the user's session
    res.clearCookie("token");
    return res.status(200).json({ message: "Sign-out successful" });
  } catch (error) {
    console.error("Error when get SIGN-OUT detail! " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
