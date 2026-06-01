import express, { Router } from "express";
const router: Router = express.Router();

import {
  index,
  vehicleDetail,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";

import { authMiddlewareAdmin } from "../middleware/auth.middleware";

router.get("/", index);

router.get("/detail/:id", vehicleDetail);

router.post("/add", authMiddlewareAdmin, addVehicle);

router.post("/update/:id", authMiddlewareAdmin, updateVehicle);

router.delete("/delete/:id", authMiddlewareAdmin, deleteVehicle);

export default router;
