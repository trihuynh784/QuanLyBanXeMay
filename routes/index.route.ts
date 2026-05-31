import { Express } from "express";

import vehicleRoute from "./vehicle.route";
import authRoute from "./auth.route";

const baseURL = "/api"

const clientRoute = (app: Express) => {
  app.use(baseURL + "/vehicles", vehicleRoute);

  app.use(baseURL + "/auth", authRoute);
}

export default clientRoute;