import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/index.js"
import { authRouter, productRouter } from "./api/routes/index.js";

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);

// MongoDB connection
await connectDB();

export default app;
