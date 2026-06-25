export interface ScoreBreakdown {
  category: string;
  score: number;
  reason: string;
}

export interface ResumeAnalysisResult {
  atsScore: number;
  summary: string;
  roleFit: string;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  missingSections: string[];
  scoreBreakdown: ScoreBreakdown[];
  priorityFixes: string[];
}

export interface AnalysisResponse {
  id: string;
  fileName: string;
  createdAt: string;
  result: ResumeAnalysisResult;
}
