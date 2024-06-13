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
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking car exists
    const car = yield car_model_1.Car.findOne({ _id: payload.car });
    if (!car) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Car not found !');
    }
    // check the car status
    const carStatus = car.status;
    if (carStatus === 'unavailable') {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This car already reservation!');
    }
    // checking user exists
    const user = yield user_model_1.User.findById(payload.user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    // create a booked
    const booking = new booking_model_1.Booking(Object.assign(Object.assign({}, payload), { isBooked: 'confirmed' }));
    yield booking.save();
    // create car status set available to unavailable
    car.status = 'unavailable';
    yield car.save();
    const result = (yield booking.populate('user')).populate('car');
    return result;
});
const getAllBookingFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // get data at QueryBuilder and filter implement
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.Booking.find().populate('user').populate('car'), query).filter();
    const result = yield bookingQuery.modelQuery;
    return result;
});
const getMyBookingFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // checking user exists
    const user = yield user_model_1.User.findById(userData);
    if (!user) {
        throw new Error('User not found');
    }
    // get my booking data
    const result = yield booking_model_1.Booking.find({ user: userData })
        .populate('user')
        .populate('car');
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getMyBookingFromDB,
};
