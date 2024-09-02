import { Request, Response, NextFunction } from "express";
import { HTTPException } from "../exceptions/root";

export const errorMiddleware = (
  error: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500; // Default to 500 if statusCode is undefined
  res.status(statusCode).json({
    message: error.message,
    errorCode: error.errorCode , // Default to a generic error code if undefined
    errors: error.errors , // Default to an empty array if errors are undefined
  });
};
