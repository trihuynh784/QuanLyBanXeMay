"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_route_1 = __importDefault(require("./vehicle.route"));
const customer_route_1 = __importDefault(require("./customer.route"));
const staff_route_1 = __importDefault(require("./staff.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const baseURL = "/api";
const clientRoute = (app) => {
    app.use(baseURL + "/vehicles", vehicle_route_1.default);
    app.use(baseURL + "/customers", customer_route_1.default);
    app.use(baseURL + "/staffs", staff_route_1.default);
    app.use(baseURL + "/auth", auth_route_1.default);
    app.use(auth_middleware_1.authMiddleware);
};
exports.default = clientRoute;
