"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const index_route_1 = __importDefault(require("./routes/index.route"));
const index_route_2 = __importDefault(require("./routes/admin/index.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT || 5000;
(0, db_1.connectDB)();
(0, index_route_1.default)(app);
(0, index_route_2.default)(app);
const swaggerDocument = JSON.parse(fs_1.default.readFileSync("./swagger.json", "utf-8"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
