import express, { Router } from "express";
const router: Router = express.Router();

import { customerDetail } from "../controllers/customer.controller";

router.get("/:id", customerDetail);

export default router;
