import express, { Router } from "express";
const router: Router = express.Router();

import { index, vehicleDetail } from "../controllers/vehicle.controller";

router.get("/", index);

router.get("/detail/:id", vehicleDetail);

export default router;
