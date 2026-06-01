import { Express } from "express";
import authRoute from "./auth.route";

const baseURL = "/api/admin";

const adminRoute = (app: Express) => {
  app.use(baseURL + "/auth", authRoute);
};

export default adminRoute;
