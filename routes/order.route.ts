import express, { Router } from "express";
import {
  getAllOrders,
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrder,
} from "../controllers/order.controller";
import { authMiddleware, authMiddlewareAdmin } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.get("/", authMiddlewareAdmin, getAllOrders);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/:id", authMiddlewareAdmin, getOrderById);
router.post("/add", authMiddleware, createOrder);
router.post("/update/:id", authMiddleware, updateOrder);

export default router;
