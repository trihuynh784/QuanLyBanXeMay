import express, { Router } from "express";
const router: Router = express.Router();

import { staffDetail } from "../controllers/staff.controller";

router.get("/:id", staffDetail);

export default router;
