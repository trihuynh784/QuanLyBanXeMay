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
exports.uploadFields = exports.uploadSingle = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
const streamUpload = (buffer, resourceType = "image") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: resourceType }, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = (buffer_1, ...args_1) => __awaiter(void 0, [buffer_1, ...args_1], void 0, function* (buffer, resourceType = "image") {
    const result = yield streamUpload(buffer, resourceType);
    return result.secure_url;
});
exports.uploadToCloudinary = uploadToCloudinary;
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return next();
    }
    try {
        req.body[req.file.fieldname] = yield (0, exports.uploadToCloudinary)(req.file.buffer);
    }
    catch (error) {
        console.error("Cloudinary Single Upload Error:", error);
    }
    next();
});
exports.uploadSingle = uploadSingle;
const uploadFields = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Array.isArray(req.files)) {
        return next();
    }
    const filesObj = req.files;
    try {
        for (const key in filesObj) {
            const array = filesObj[key];
            const uploadPromises = array.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                const resourceType = item.mimetype.startsWith("audio/")
                    ? "video"
                    : item.mimetype.startsWith("image/")
                        ? "image"
                        : "raw";
                return (0, exports.uploadToCloudinary)(item.buffer, resourceType);
            }));
            req.body[key] = yield Promise.all(uploadPromises);
        }
    }
    catch (error) {
        console.error("Cloudinary Fields Upload Error:", error);
    }
    next();
});
exports.uploadFields = uploadFields;
