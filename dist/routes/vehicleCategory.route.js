"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const vehicleCategory_controller_1 = require("../controllers/vehicleCategory.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
router.get("/", vehicleCategory_controller_1.index);
router.post("/add", auth_middleware_1.authMiddlewareAdmin, vehicleCategory_controller_1.addCategory);
router.post("/update/:id", auth_middleware_1.authMiddlewareAdmin, vehicleCategory_controller_1.updateCategory);
router.delete("/delete/:id", auth_middleware_1.authMiddlewareAdmin, vehicleCategory_controller_1.deleteCategory);
exports.default = router;
