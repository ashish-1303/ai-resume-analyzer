import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { env } from "../config/env.js";
import { AppError } from "../middleware/errorHandler.js";
import { extractJson } from "../utils/json.js";
import type { ResumeAnalysisResult } from "../types/analysis.js";
import { StatusCodes } from "http-status-codes";

const analysisSchema = z.object({
  atsScore: z.number().min(0).max(100),
  summary: z.string(),
  roleFit: z.string(),
  strengths: z.array(z.string()).min(1),
  improvements: z.array(z.string()).min(1),
  missingKeywords: z.array(z.string()),
  missingSections: z.array(z.string()),
  scoreBreakdown: z.array(
    z.object({
      category: z.string(),
      score: z.number().min(0).max(100),
      reason: z.string()
    })
  ),
  priorityFixes: z.array(z.string()).min(1)
});

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const analyzeResumeWithGemini = async (resumeText: string): Promise<ResumeAnalysisResult> => {
  const model = genAI.getGenerativeModel({ model: env.GEMINI_MODEL });

  const prompt = `
You are an expert ATS resume reviewer and hiring manager.
Analyze the resume text below and return only JSON matching this exact TypeScript shape:
{
  "atsScore": number,
  "summary": string,
  "roleFit": string,
  "strengths": string[],
  "improvements": string[],
  "missingKeywords": string[],
  "missingSections": string[],
  "scoreBreakdown": [{ "category": string, "score": number, "reason": string }],
  "priorityFixes": string[]
}

Scoring guidance:
- atsScore must be 0-100.
- scoreBreakdown should include Formatting, Keywords, Experience Impact, Skills, Education, and Contact Details.
- Make feedback specific, direct, and practical.
- Do not invent work history. If information is missing, say it is missing.

Resume text:
${resumeText.slice(0, 24000)}
`;

  try {
    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const parsed = JSON.parse(extractJson(text));
    return analysisSchema.parse(parsed);
  } catch (error) {
    console.error("[gemini-analysis-error]", error);
    throw new AppError("Gemini could not analyze this resume.",
      StatusCodes.BAD_GATEWAY
    );
  }
};
