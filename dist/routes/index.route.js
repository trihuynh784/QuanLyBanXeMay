"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_route_1 = __importDefault(require("./vehicle.route"));
const vehicleModel_route_1 = __importDefault(require("./vehicleModel.route"));
const vehicleCategory_route_1 = __importDefault(require("./vehicleCategory.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const baseURL = "/api";
const clientRoute = (app) => {
    app.use(baseURL + "/vehicles", vehicle_route_1.default);
    app.use(baseURL + "/vehicle-models", vehicleModel_route_1.default);
    app.use(baseURL + "/vehicle-categories", vehicleCategory_route_1.default);
    app.use(baseURL + "/uploads", upload_route_1.default);
    app.use(baseURL + "/auth", auth_route_1.default);
};
exports.default = clientRoute;
