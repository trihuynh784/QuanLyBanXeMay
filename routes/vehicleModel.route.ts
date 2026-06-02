import express, { Router } from "express";
const router: Router = express.Router();

import {
  index,
  addModel,
  updateModel,
  deleteModel,
} from "../controllers/vehicleModel.controller";

import { authMiddlewareAdmin } from "../middleware/auth.middleware";

router.get("/", index);

router.post("/add", authMiddlewareAdmin, addModel);

router.post("/update/:id", authMiddlewareAdmin, updateModel);

router.delete("/delete/:id", authMiddlewareAdmin, deleteModel);

export default router;
