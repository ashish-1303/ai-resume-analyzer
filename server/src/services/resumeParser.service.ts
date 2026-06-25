import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { AppError } from "../middleware/errorHandler.js";
import { StatusCodes } from "http-status-codes";

const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim();

export const parseResumeText = async (file: Express.Multer.File) => {
  const extension = file.originalname.split(".").pop()?.toLowerCase();
  if (file.mimetype === "application/pdf" || extension === "pdf") {
    const parser = new PDFParse({ data: file.buffer });
    try {
      const parsed = await parser.getText();
      return normalizeText(parsed.text);
    } catch (error) {
      console.error("[pdf-parse-error]", error);
      throw new AppError(
        "Could not read text from this PDF. Try a text-based PDF, DOCX or TXT version of the resume.",
        StatusCodes.BAD_REQUEST
      );
    } finally {
      await parser.destroy();
    }
  }
  if (
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extension === "docx"
  ) {
    const parsed = await mammoth.extractRawText({ buffer: file.buffer });
    return normalizeText(parsed.value);
  }
  if (file.mimetype === "text/plain" || extension === "txt") {
    return normalizeText(file.buffer.toString("utf-8"));
  }
  throw new AppError("Only PDF, DOCX and TXT resumes are supported.", StatusCodes.BAD_REQUEST);
};
