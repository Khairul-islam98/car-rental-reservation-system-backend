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
exports.AuthServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../utils/sendEmail");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking user exists
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This user already exist !');
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking user exists
    const user = yield user_model_1.User.isUserExist(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    if (user.status === 'block') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `${user.name} you are block`);
    }
    // check password matche
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'password do not matched!');
    }
    // token create
    const jwtPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    return {
        user,
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    if (user.status === 'block') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `${user.name} you are block`);
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const resetToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: '30m',
    });
    const resetUILink = `${config_1.default.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetUILink);
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    if (user.status === 'block') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `${user.name} you are block`);
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted');
    }
    const decoded = jsonwebtoken_1.default.verify(payload.token, config_1.default.jwt_access_secret);
    if (payload.email !== decoded.email) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden!');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({ email: decoded.email, role: decoded.role }, {
        password: newHashedPassword,
    });
});
exports.AuthServices = {
    registerIntoDB,
    login,
    forgetPassword,
    resetPassword,
};
