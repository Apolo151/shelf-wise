// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error for debugging

  // Send a generic error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};