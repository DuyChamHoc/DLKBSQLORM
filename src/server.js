import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { configViewEngine } from "./config/viewEngine.js";
import { initWebRoutes } from "./route/web.js";
import { connectDB } from "./config/connectDB.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(
  express.json({
    limit: "50mb",
    extended: true,
  })
);

configViewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.port || 6969;
app.listen(port, () => {
  console.log("running on port: " + port);
});
