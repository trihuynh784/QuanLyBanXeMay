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
const StringGeneration_1 = require("../../helpers/StringGeneration");
const NhanVien_1 = __importDefault(require("../../models/NhanVien"));
require("../../models/VaiTro");
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenDangNhap, matKhau } = req.body;
    if (!tenDangNhap || !matKhau) {
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    }
    try {
        const user = yield NhanVien_1.default.findOne({ tenDangNhap }).populate({
            path: "vaiTroId",
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = bcrypt_1.default.compareSync(matKhau, user.matKhau);
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
    }
    catch (error) {
        console.error("Error when get SIGN-IN! " + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenDangNhap, matKhau, vaiTroId, hoTen, soDienThoai, email, trangThai, } = req.body;
    if (!tenDangNhap ||
        !matKhau ||
        !vaiTroId ||
        !hoTen ||
        !soDienThoai ||
        !email ||
        !trangThai) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = yield NhanVien_1.default.findOne({ tenDangNhap });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const hashedPassword = bcrypt_1.default.hashSync(matKhau, 10);
        const token = (0, StringGeneration_1.generateRandomString)(32);
        const newUser = new NhanVien_1.default({
            tenDangNhap,
            matKhau: hashedPassword,
            token,
            hoTen,
            soDienThoai,
            email,
            trangThai,
            vaiTroId,
        });
        yield newUser.save();
        yield newUser.populate({ path: "vaiTroId" });
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
