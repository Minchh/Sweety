import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { appConfig, connectDB } from "./config/index.js"
import { authRouter, productRouter } from "./api/routes/index.js";

const app = express();

// Middlewares
app.use(cors({ origin: appConfig.clientURL, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);

// MongoDB connection
await connectDB();

export default app;
