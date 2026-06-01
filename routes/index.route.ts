import { Express } from "express";

import vehicleRoute from "./vehicle.route";
import vehicleModelRoute from "./vehicleModel.route";
import vehicleCategoryRoute from "./vehicleCategory.route";
import authRoute from "./auth.route";
import uploadRoute from "./upload.route";
import customerRoute from "./customer.route";

const baseURL = "/api";

const clientRoute = (app: Express) => {
  app.use(baseURL + "/vehicles", vehicleRoute);

  app.use(baseURL + "/vehicle-models", vehicleModelRoute);

  app.use(baseURL + "/vehicle-categories", vehicleCategoryRoute);

  app.use(baseURL + "/uploads", uploadRoute);

  app.use(baseURL + "/auth", authRoute);

  app.use(baseURL + "/customers", customerRoute);
};

export default clientRoute;
