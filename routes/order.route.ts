import express, { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "../controllers/order.controller";
import { authMiddlewareAdmin } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.get("/", authMiddlewareAdmin, getAllOrders);
router.get("/:id", authMiddlewareAdmin, getOrderById);
router.post("/add", authMiddlewareAdmin, createOrder);

export default router;
