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
exports.CarServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const car_model_1 = require("./car.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("../booking/booking.model");
const user_model_1 = require("../user/user.model");
const car_utils_1 = require("./car.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const car_constant_1 = require("./car.constant");
const createCarsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a car
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const getAllCarsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const carQuery = new QueryBuilder_1.default(car_model_1.Car.find(), query)
        .search(car_constant_1.carSeachableFields)
        .filter()
        .sort();
    const result = yield carQuery.modelQuery;
    return result;
});
const getSingleCarsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // get single car
    const result = yield car_model_1.Car.findById(id);
    return result;
});
const updateCarsIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking car id is exists
    const isCarExists = yield car_model_1.Car.findById(id);
    if (!isCarExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Car is not found !');
    }
    // update car information in DB
    const result = yield car_model_1.Car.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteCarsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // checking car id is exists
    const isCarExists = yield car_model_1.Car.findById(id);
    if (!isCarExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Car is not found !');
    }
    // car partial delete from dB
    const result = yield car_model_1.Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const returnCarIntoDB = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    // checking user exists
    const userData = yield user_model_1.User.isUserExist(user === null || user === void 0 ? void 0 : user.email);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // checking booking id is exists
    const bookingData = yield booking_model_1.Booking.findById(data.bookingId);
    if (!bookingData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found!');
    }
    // checking car is exists
    const carData = yield car_model_1.Car.findById(bookingData === null || bookingData === void 0 ? void 0 : bookingData.car);
    if (!carData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Car not found!');
    }
    const pricePerHour = carData === null || carData === void 0 ? void 0 : carData.pricePerHour;
    const bookingDataStartTime = bookingData === null || bookingData === void 0 ? void 0 : bookingData.startTime;
    // total cost calculation
    const totalCost = (0, car_utils_1.totalCostCalculation)(bookingDataStartTime, data.endTime, pricePerHour);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // car status unavailable to availabe set DB
        const updatedCarData = yield car_model_1.Car.findByIdAndUpdate(bookingData === null || bookingData === void 0 ? void 0 : bookingData.car, { status: 'available' }, { new: true, session });
        if (!updatedCarData) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update data!');
        }
        // save totalcost in DB
        const result = yield booking_model_1.Booking.findByIdAndUpdate(data.bookingId, {
            endTime: data.endTime,
            payment: 'pending',
            totalCost: totalCost,
        }, { new: true, session })
            .populate('car')
            .populate('user');
        if (!result) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update data!');
        }
        yield session.commitTransaction();
        yield session.endSession();
        const resultData = result.toObject();
        delete resultData.isBooked;
        return resultData;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bad request!');
    }
});
exports.CarServices = {
    createCarsIntoDB,
    getAllCarsFromDB,
    getSingleCarsFromDB,
    updateCarsIntoDB,
    deleteCarsFromDB,
    returnCarIntoDB,
};
