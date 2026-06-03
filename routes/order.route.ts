import express, { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
} from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = express.Router();

router.get("/", authMiddleware, getAllOrders);
router.get("/:id", authMiddleware, getOrderById);
router.post("/add", authMiddleware, createOrder);

export default router;
