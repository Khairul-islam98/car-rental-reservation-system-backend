import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(CarValidations.createCarValidationSchema),
  CarControllers.createCars,
);
router.get('/', CarControllers.getAllCars);
router.get('/:id', CarControllers.getSingleCars);
router.put('/return', auth('admin'), CarControllers.returnCar);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(CarValidations.updateCarValidationSchema),
  CarControllers.updateCars,
);

router.delete('/:id', auth('admin'), CarControllers.deleteCars);
export const CarRoutes = router;
