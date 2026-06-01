import express, { Router } from "express";
const router: Router = express.Router();

import {
  index,
  addModel,
  deleteModel,
} from "../controllers/vehicleModel.controller";

import { authMiddlewareAdmin } from "../middleware/auth.middleware";

router.get("/", index);

router.post("/add", authMiddlewareAdmin, addModel);

router.delete("/delete/:id", authMiddlewareAdmin, deleteModel);

export default router;
