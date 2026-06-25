import { Schema, model } from "mongoose";
import type { ResumeAnalysisResult } from "../types/analysis.js";

export interface ResumeAnalysisDocument {
  fileName: string;
  fileType: string;
  rawText: string;
  result: ResumeAnalysisResult;
  createdAt: Date;
  updatedAt: Date;
}
const resumeAnalysisSchema = new Schema<ResumeAnalysisDocument>(
  {
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    rawText: { type: String, required: true },
    result: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);
export const ResumeAnalysisModel = model<ResumeAnalysisDocument>("ResumeAnalysis", resumeAnalysisSchema);
