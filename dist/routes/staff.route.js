"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const staff_controller_1 = require("../controllers/staff.controller");
router.get("/:id", staff_controller_1.staffDetail);
exports.default = router;
