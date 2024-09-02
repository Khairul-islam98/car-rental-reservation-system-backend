"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('admin'), user_controller_1.UserControllers.getAllUser);
router.put('/:id', (0, auth_1.default)('admin'), user_controller_1.UserControllers.getUpdateUser);
router.delete('/:id', (0, auth_1.default)('admin'), user_controller_1.UserControllers.deleteUser);
router.put('/profile/:email', (0, auth_1.default)('user'), user_controller_1.UserControllers.updateProfile);
router.get('/profile/:email', (0, auth_1.default)('user'), user_controller_1.UserControllers.getMyProfile);
exports.UserRoutes = router;
