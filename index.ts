import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import fs from "fs";
import cors from "cors";
dotenv.config();

import clientRoute from "./routes/index.route";
import adminRoute from "./routes/admin/index.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 5000;

connectDB();

clientRoute(app);
adminRoute(app);

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
