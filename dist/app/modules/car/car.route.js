"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("./car.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const car_validation_1 = require("./car.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(car_validation_1.CarValidations.createCarValidationSchema), car_controller_1.CarControllers.createCars);
router.get('/', car_controller_1.CarControllers.getAllCars);
router.get('/:id', car_controller_1.CarControllers.getSingleCars);
router.put('/return', (0, auth_1.default)('admin'), car_controller_1.CarControllers.returnCar);
router.put('/:id', (0, auth_1.default)('admin'), car_controller_1.CarControllers.updateCars);
router.delete('/:id', (0, auth_1.default)('admin'), car_controller_1.CarControllers.deleteCars);
exports.CarRoutes = router;
