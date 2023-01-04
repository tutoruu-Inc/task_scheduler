import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";

import { initCrons } from "./Crons.js";
import taskRoute from "./Task/route.js";
dotenv.config();

export const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors({ origin: process.env.CORS_ORIGINS ?? "*" }));

try {
  mongoose.connect(process.env.DB_CONN_STRING);
  console.log("Database connection established...");

  initCrons();
  console.log("Crons initiated...");

  app.get("/", (req, res) => {
    res.send("Scheduler up and running...");
  });

  app.use("/tasks", taskRoute);

  app.listen(process.env.PORT ?? 1010, () => {
    console.log(
      `⚡️[server]: Server is running on port ${process.env.PORT ?? 1010}`
    );
  });
} catch (err) {
  console.error(err);
}
