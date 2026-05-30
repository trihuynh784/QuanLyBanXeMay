import { Express } from "express";

import vehicleRoute from "./vehicle.route";
import customerRoute from "./customer.route";
import staffRoute from "./staff.route";
import authRoute from "./auth.route";

import { authMiddleware } from "../middleware/auth.middleware";

const baseURL = "/api"

const clientRoute = (app: Express) => {
  app.use(baseURL + "/vehicles", vehicleRoute);
  
  app.use(baseURL + "/customers", customerRoute);

  app.use(baseURL + "/staffs", staffRoute);

  app.use(baseURL + "/auth", authRoute);

  app.use(authMiddleware);
}

export default clientRoute;