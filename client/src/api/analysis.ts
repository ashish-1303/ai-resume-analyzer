import axios from "axios";
import type { AnalysisResponse } from "../types/analysis";

export const analyzeResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);
  const response = await axios.post<AnalysisResponse>("/api/analysis", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};
