"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const vehicleModel_controller_1 = require("../controllers/vehicleModel.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
router.get("/", vehicleModel_controller_1.index);
router.post("/add", auth_middleware_1.authMiddlewareAdmin, vehicleModel_controller_1.addModel);
router.post("/update/:id", auth_middleware_1.authMiddlewareAdmin, vehicleModel_controller_1.updateModel);
router.delete("/delete/:id", auth_middleware_1.authMiddlewareAdmin, vehicleModel_controller_1.deleteModel);
exports.default = router;
