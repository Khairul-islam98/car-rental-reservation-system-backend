"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:5175',
        'http://localhost:5177',
        'http://localhost:5174',
        'http://localhost:5176',
    ],
    credentials: true,
}));
// application routes
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome To Car Rental Reservation System');
});
// global error handler
app.use(globalErrorHandler_1.default);
// Api Not Found
app.use(notFound_1.default);
exports.default = app;
