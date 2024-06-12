import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CarValidations.createCarValidationSchema),
  CarControllers.createCars,
);
router.get('/', CarControllers.getAllCars);

export const CarRoutes = router;
