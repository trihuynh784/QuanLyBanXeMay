import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Hàm helper upload stream (Giữ nguyên, thêm Type cho rõ ràng)
const streamUpload = (
  buffer: Buffer,
  resourceType: "image" | "video" | "raw" = "image",
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Hàm này giờ sẽ trả về secure_url (https)
export const uploadToCloudinary = async (
  buffer: Buffer,
  resourceType: "image" | "video" | "raw" = "image",
): Promise<string> => {
  const result = await streamUpload(buffer, resourceType);
  return result.secure_url; // Dùng secure_url tốt hơn url thường
};

// Middleware xử lý 1 file
export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return next();
  }

  try {
    req.body[req.file.fieldname] = await uploadToCloudinary(req.file.buffer);
  } catch (error) {
    console.error("Cloudinary Single Upload Error:", error);
    // Bạn có thể chọn return res.status(500) hoặc next(error) ở đây nếu muốn báo lỗi về client
  }

  next();
};

// Middleware xử lý nhiều field file (Đã tối ưu Promise.all)
export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.files || Array.isArray(req.files)) {
    return next();
  }

  const filesObj = req.files as { [fieldname: string]: Express.Multer.File[] };

  try {
    // Chạy qua từng field
    for (const key in filesObj) {
      const array = filesObj[key];

      // Tạo một danh sách các Promise upload chạy song song
      const uploadPromises = array.map(async (item) => {
        const resourceType = item.mimetype.startsWith("audio/")
          ? "video"
          : item.mimetype.startsWith("image/")
            ? "image"
            : "raw";
        return uploadToCloudinary(item.buffer, resourceType);
      });

      // Đợi tất cả các file trong field này upload xong cùng lúc
      req.body[key] = await Promise.all(uploadPromises);
    }
  } catch (error) {
    console.error("Cloudinary Fields Upload Error:", error);
    // Xử lý lỗi nếu cần
  }

  next();
};
