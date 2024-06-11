"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    // setting default values
    const statusCode = 500;
    const message = err.message || 'Something went wrong';
    return res.status(statusCode).json({
        success: true,
        message,
        error: err,
    });
};
exports.default = globalErrorHandler;
