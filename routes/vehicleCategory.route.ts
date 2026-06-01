import express, { Router } from "express";
const router: Router = express.Router();

import {
  index,
  addCategory,
  deleteCategory,
} from "../controllers/vehicleCategory.controller";

import { authMiddlewareAdmin } from "../middleware/auth.middleware";

router.get("/", index);

router.post("/add", authMiddlewareAdmin, addCategory);

router.delete("/delete/:id", authMiddlewareAdmin, deleteCategory);

export default router;
