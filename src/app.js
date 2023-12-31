import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://list-front.vercel.app"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
