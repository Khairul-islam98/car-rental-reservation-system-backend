import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.register,
);
router.post(
  '/signin',
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;
