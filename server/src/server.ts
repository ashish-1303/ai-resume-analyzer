import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import { env } from "./config/env.js";
import { analysisRouter } from "./routes/analysis.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const createServer = () => {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_URL }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => {
    res.status(StatusCodes.OK).json({ status: "ok" });
  });
  app.use("/api/analysis", analysisRouter);
  app.use(errorHandler);
  return app;
};
