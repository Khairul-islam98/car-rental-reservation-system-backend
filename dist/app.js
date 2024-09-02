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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        'https://car-rentals-services.netlify.app',
        'http://localhost:5173',
    ],
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
