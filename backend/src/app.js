import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./config/index.js"
import { productRouter } from "./api/routes/index.js";

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/api/v1/products", productRouter);

// MongoDB connection
await connectDB();

export default app;
