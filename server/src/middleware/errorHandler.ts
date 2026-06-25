import type { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
  }
}
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof AppError ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error instanceof Error ? error.message : "Something went wrong!";
  console.error("[error]", {
    statusCode,
    message,
    stack: error instanceof Error ? error.stack : undefined
  });
  res.status(statusCode).json({
    message: statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? "Internal server error" : message
  });
};
