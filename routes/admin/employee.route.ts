import express, { Router } from "express";
const router: Router = express.Router();

import { getAllEmployees, getEmployeeById, updateEmployee, changeStatus } from "../../controllers/admin/employee.controller";

import { authMiddlewareAdmin } from "../../middleware/auth.middleware";

router.get("/", authMiddlewareAdmin, getAllEmployees);
router.get("/:id", authMiddlewareAdmin, getEmployeeById);
router.post("/update/:id", authMiddlewareAdmin, updateEmployee);
router.post("/change-status/:id", authMiddlewareAdmin, changeStatus);

export default router;
