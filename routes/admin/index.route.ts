import { Express } from "express";
import authRoute from "./auth.route";
import employeeRoute from "./employee.route";

const baseURL = "/api/admin";

const adminRoute = (app: Express) => {
  app.use(baseURL + "/auth", authRoute);
  app.use(baseURL + "/employees", employeeRoute);
};

export default adminRoute;
