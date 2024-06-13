"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simlifiedError = (0, handleZodError_1.default)(err);
        statusCode = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.statusCode;
        message = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.message;
        errorSources = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidatorError') {
        const simlifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.statusCode;
        message = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.message;
        errorSources = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simlifiedError = (0, handleCastError_1.default)(err);
        statusCode = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.statusCode;
        message = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.message;
        errorSources = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simlifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.statusCode;
        message = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.message;
        errorSources = simlifiedError === null || simlifiedError === void 0 ? void 0 : simlifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
