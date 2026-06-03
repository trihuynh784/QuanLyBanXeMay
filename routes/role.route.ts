import express, { Router } from "express";
const router: Router = express.Router();

import {
  index,
  addRole,
  updateRole,
  deleteRole,
} from "../controllers/role.controller";

import { authMiddlewareAdmin } from "../middleware/auth.middleware";

router.get("/", authMiddlewareAdmin, index);

router.post("/add", authMiddlewareAdmin, addRole);

router.post("/update/:id", authMiddlewareAdmin, updateRole);

router.delete("/delete/:id", authMiddlewareAdmin, deleteRole);

export default router;
