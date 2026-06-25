import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../middleware/errorHandler.js";
import { ResumeAnalysisModel } from "../models/resumeAnalysis.model.js";
import { analyzeResumeWithGemini } from "../services/gemini.service.js";
import { parseResumeText } from "../services/resumeParser.service.js";

export const analyzeResume: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("Please upload a resume file.", StatusCodes.BAD_REQUEST);
    }
    const resumeText = await parseResumeText(req.file);
    if (resumeText.length < 120) {
      throw new AppError("The uploaded resume does not contain enough readable text.", StatusCodes.BAD_REQUEST);
    }
    const result = await analyzeResumeWithGemini(resumeText);
    const savedAnalysis = await ResumeAnalysisModel.create({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      rawText: resumeText,
      result
    });
    res.status(StatusCodes.CREATED).json({
      id: savedAnalysis.id,
      fileName: savedAnalysis.fileName,
      createdAt: savedAnalysis.createdAt,
      result
    });
  } catch (error) {
    next(error);
  }
};
export const listAnalyses: RequestHandler = async (_req, res, next) => {
  try {
    const analyses = await ResumeAnalysisModel.find()
      .select("fileName result.atsScore result.summary createdAt")
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(StatusCodes.OK).json({ analyses });
  } catch (error) {
    next(error);
  }
};
