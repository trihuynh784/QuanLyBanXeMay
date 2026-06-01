import express, { Router } from "express";
const router: Router = express.Router();

import { updateCustomer, getAllCustomers, getCustomerById, changeStatus } from "../controllers/customer.controller";

import { authMiddleware, authMiddlewareAdmin } from "../middleware/auth.middleware";

router.post("/update/:id", authMiddleware, updateCustomer);
router.get("/", authMiddlewareAdmin, getAllCustomers);
router.get("/:id", authMiddlewareAdmin, getCustomerById);
router.post("/change-status/:id", authMiddlewareAdmin, changeStatus);

export default router;
