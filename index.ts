import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import clientRoute from "./routes/index.route";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

connectDB();

clientRoute(app);

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});