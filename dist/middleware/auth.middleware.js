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
exports.authMiddlewareAdmin = exports.authMiddleware = void 0;
const KhachHang_1 = __importDefault(require("../models/KhachHang"));
const NhanVien_1 = __importDefault(require("../models/NhanVien"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const token = ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]) || ((_c = req.cookies) === null || _c === void 0 ? void 0 : _c.token);
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    const user = yield KhachHang_1.default.findOne({ token });
    if (!user) {
        return res.status(401).json({ message: "Invalid token" });
    }
    req["user"] = user;
    next();
});
exports.authMiddleware = authMiddleware;
const authMiddlewareAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const token = ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]) || ((_c = req.cookies) === null || _c === void 0 ? void 0 : _c.token);
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    const user = yield NhanVien_1.default.findOne({ token });
    if (!user) {
        return res.status(401).json({ message: "Invalid token" });
    }
    req["user"] = user;
    next();
});
exports.authMiddlewareAdmin = authMiddlewareAdmin;
