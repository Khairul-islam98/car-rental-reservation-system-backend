/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  const statusCode = 500;
  const message = err.message || 'Something went wrong';
  return res.status(statusCode).json({
    success: true,
    message,
    error: err,
  });
};

export default globalErrorHandler;
