import express, { Router } from "express";
const router: Router = express.Router();

import { updateCustomer } from "../controllers/customer.controller";

import { authMiddleware } from "../middleware/auth.middleware";

router.post("/update/:id", authMiddleware, updateCustomer);

export default router;
