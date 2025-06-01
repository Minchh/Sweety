import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { appConfig, connectDB } from "./config/index.js";
import { authRouter, productRouter, cartRouter, profileRouter, orderRouter } from "./api/routes/index.js";

const app = express();

// Middlewares
app.use(cors({ origin: appConfig.clientURL, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/order", orderRouter);

// MongoDB connection
await connectDB();

export default app;
