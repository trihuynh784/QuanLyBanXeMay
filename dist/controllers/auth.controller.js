"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signUp = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const StringGeneration_1 = require("../helpers/StringGeneration");
const KhachHang_1 = __importDefault(require("../models/KhachHang"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    }
    try {
        const user = yield KhachHang_1.default.findOne({ tenDangNhap: username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = bcrypt_1.default.compareSync(password, user.matKhau);
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
    }
    catch (error) {
        console.error("Error when get SIGN-IN! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullName, cccd, phoneNumber, email, address } = req.body;
    if (!username ||
        !password ||
        !fullName ||
        !cccd ||
        !phoneNumber ||
        !email ||
        !address) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = yield KhachHang_1.default.findOne({ tenDangNhap: username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const token = (0, StringGeneration_1.generateRandomString)(32);
        const newUser = new KhachHang_1.default({
            tenDangNhap: username,
            matKhau: hashedPassword,
            token,
            hoTen: fullName,
            cccd,
            soDienThoai: phoneNumber,
            email,
            diaChi: address,
        });
        yield newUser.save();
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
    }
    catch (error) {
        console.error("Error when get SIGN-UP! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signUp = signUp;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Sign-out successful" });
    }
    catch (error) {
        console.error("Error when get SIGN-OUT! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signOut = signOut;
