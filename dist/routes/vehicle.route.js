"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const vehicle_controller_1 = require("../controllers/vehicle.controller");
router.get("/", vehicle_controller_1.index);
router.get("/detail/:id", vehicle_controller_1.vehicleDetail);
exports.default = router;
