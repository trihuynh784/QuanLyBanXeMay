"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const customer_controller_1 = require("../controllers/customer.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
router.post("/update/:id", auth_middleware_1.authMiddleware, customer_controller_1.updateCustomer);
router.get("/", auth_middleware_1.authMiddlewareAdmin, customer_controller_1.getAllCustomers);
router.get("/:id", auth_middleware_1.authMiddlewareAdmin, customer_controller_1.getCustomerById);
router.post("/change-status/:id", auth_middleware_1.authMiddlewareAdmin, customer_controller_1.changeStatus);
exports.default = router;
