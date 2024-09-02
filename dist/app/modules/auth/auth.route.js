"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidations.createUserValidationSchema), auth_controller_1.AuthControllers.register);
router.post('/signin', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginUserValidationSchema), auth_controller_1.AuthControllers.login);
router.post('/forget-password', auth_controller_1.AuthControllers.forgetPassword);
router.post('/reset-password', auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
