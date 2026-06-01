import express, { Router } from "express";
import multer from "multer";
const router: Router = express.Router();

const upload = multer();

import * as controller from "../controllers/upload.controller";
import { uploadSingle, uploadFields } from "../middleware/upload.middleware";

// Route: POST /api/upload/single
// Client gửi form-data với key là "avatar"
router.post(
  "/single",
  upload.single("avatar"),
  uploadSingle,
  controller.uploadSingle,
);

// Route: POST /api/upload/multiple
// Client gửi form-data với key là "hinhAnh"
router.post(
  "/multiple",
  upload.fields([{ name: "hinhAnh", maxCount: 10 }]),
  uploadFields,
  controller.uploadMultiple,
);

export default router;
