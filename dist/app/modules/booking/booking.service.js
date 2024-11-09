"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = require("../car/car.model");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const car_utils_1 = require("../car/car.utils");
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.create(payload);
    const result = (yield booking.populate('user')).populate('car');
    return result;
});
const getAllBookingFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // get data at QueryBuilder and filter implement
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.Booking.find().populate('user').populate('car'), query).filter();
    const result = yield bookingQuery.modelQuery;
    return result;
});
const getUpdateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const car = await Car.findOne({ _id: payload.car });
        // if (!car) {
        //   throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
        // }
        // if (payload.isBooked === 'confirmed') {
        //   if (car.status === 'unavailable') {
        //     throw new AppError(
        //       httpStatus.CONFLICT,
        //       'This car is already reserved!',
        //     );
        //   }
        //   car.status = 'unavailable';
        //   await car.save();
        // } else if (payload.isBooked === 'cancelled') {
        //   car.status = 'available';
        //   await car.save();
        // }
        yield car_model_1.Car.findByIdAndUpdate(payload.car, { status: 'unavailable' }, { new: true });
        const result = yield booking_model_1.Booking.findByIdAndUpdate(id, payload, { new: true });
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found!');
        }
        return result;
    }
    catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
});
const getMyBookingFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userData);
    if (!user) {
        throw new Error('User not found');
    }
    const result = yield booking_model_1.Booking.find({ user: userData })
        .populate('user')
        .populate('car');
    return result;
});
const getUpdateMyBookingFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = yield booking_model_1.Booking.findById(id);
    if (!bookingData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found!');
    }
    const carData = yield car_model_1.Car.findById(bookingData.car);
    if (!carData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Car not found!');
    }
    const pricePerHour = carData.pricePerHour;
    const { startTime, endTime } = payload;
    // Calculate total cost
    const totalCost = (0, car_utils_1.totalCostCalculation)(startTime, endTime, pricePerHour);
    console.log('Total Cost:', totalCost);
    // Update the booking with the calculated cost
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, Object.assign(Object.assign({}, payload), { totalCost }), { new: true });
    return result;
});
const deleteMyBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndDelete(id);
    return result;
});
const getTotalBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalBookings = yield booking_model_1.Booking.countDocuments();
    return totalBookings;
});
const getTotalAvailableCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalAvailableCars = yield car_model_1.Car.countDocuments({ status: 'available' });
    return totalAvailableCars;
});
const getTotalRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const totalRevenue = yield booking_model_1.Booking.aggregate([
        { $match: { payment: 'paid' } }, // Assuming you have a paymentStatus field
        { $group: { _id: null, totalRevenue: { $sum: '$totalCost' } } },
    ]);
    return ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
const adminCountDashboardFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalBookings = yield getTotalBookingsFromDB();
    const totalAvailableCars = yield getTotalAvailableCarsFromDB();
    const totalRevenue = yield getTotalRevenueFromDB();
    return {
        totalBookings,
        totalAvailableCars,
        totalRevenue,
    };
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getUpdateBookingIntoDB,
    getMyBookingFromDB,
    getUpdateMyBookingFromDB,
    deleteMyBookingFromDB,
    adminCountDashboardFromDB,
};
