"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.createBooking);
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.BookingControllers.getAllBooking);
router.put('/:id', (0, auth_1.default)('admin'), booking_controller_1.BookingControllers.getUpdateBooking);
router.get('/my-bookings', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.getMyBooking);
router.put('/my-bookings/:id', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.updateMyBooking);
router.delete('/my-bookings/:id', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.deleteMyBooking);
router.get('/dashboard', booking_controller_1.BookingControllers.adminCountDashboard);
exports.BookingRoutes = router;
