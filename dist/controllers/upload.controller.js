"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiple = exports.uploadSingle = void 0;
const uploadSingle = (req, res) => {
    const imageUrl = req.body ? req.body.avatar : null;
    if (!imageUrl) {
        return res
            .status(400)
            .json({ message: "No image provided or upload failed" });
    }
    return res.status(200).json({
        message: "Upload single image successfully",
        data: {
            url: imageUrl,
        },
    });
};
exports.uploadSingle = uploadSingle;
const uploadMultiple = (req, res) => {
    const imageUrls = req.body.hinhAnh;
    if (!imageUrls || imageUrls.length === 0) {
        return res
            .status(400)
            .json({ message: "No images provided or upload failed" });
    }
    return res.status(200).json({
        message: "Upload multiple images successfully",
        data: {
            urls: imageUrls,
        },
    });
};
exports.uploadMultiple = uploadMultiple;
