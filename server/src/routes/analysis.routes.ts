import { Router } from "express";
import multer from "multer";
import { analyzeResume, listAnalyses } from "../controllers/analysis.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});
export const analysisRouter = Router();
analysisRouter.get("/", listAnalyses);
analysisRouter.post("/", upload.single("resume"), analyzeResume);
