"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const employee_controller_1 = require("../../controllers/admin/employee.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
router.get("/", auth_middleware_1.authMiddlewareAdmin, employee_controller_1.getAllEmployees);
router.get("/:id", auth_middleware_1.authMiddlewareAdmin, employee_controller_1.getEmployeeById);
router.post("/update/:id", auth_middleware_1.authMiddlewareAdmin, employee_controller_1.updateEmployee);
router.post("/change-status/:id", auth_middleware_1.authMiddlewareAdmin, employee_controller_1.changeStatus);
exports.default = router;
