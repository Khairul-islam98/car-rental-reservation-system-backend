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
exports.CarControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const car_service_1 = require("./car.service");
const createCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_service_1.CarServices.createCarsIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Car created successfully',
        data: result,
    });
}));
const getAllCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_service_1.CarServices.getAllCarsFromDB();
    if (!result) {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No Data Found',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cars retrieved successfully',
        data: result,
    });
}));
const getSingleCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield car_service_1.CarServices.getSingleCarsFromDB(id);
    if (!result) {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No Data Found',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'A Car retrieved successfully',
        data: result,
    });
}));
const updateCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield car_service_1.CarServices.updateCarsIntoDB(id, req.body);
    if (!result) {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No Data Found',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Car updated successfully',
        data: result,
    });
}));
const deleteCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield car_service_1.CarServices.deleteCarsFromDB(id);
    if (!result) {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No Data Found',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Car Deleted successfully',
        data: result,
    });
}));
const returnCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const data = req.body;
    const result = yield car_service_1.CarServices.returnCarIntoDB(user, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Car returned successfully',
        data: result,
    });
}));
exports.CarControllers = {
    createCars,
    getAllCars,
    getSingleCars,
    updateCars,
    deleteCars,
    returnCar,
};
