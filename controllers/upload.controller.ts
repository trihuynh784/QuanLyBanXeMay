import { Request, Response } from "express";

export const uploadSingle = (req: Request, res: Response) => {
  // Lấy url đã được middleware cloudinary.middleware nhét vào req.body
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

export const uploadMultiple = (req: Request, res: Response) => {
  // Lấy mảng urls đã được middleware cloudinary.middleware nhét vào req.body
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
