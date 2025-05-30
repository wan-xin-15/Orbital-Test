import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", mainRouter);

export default app;
