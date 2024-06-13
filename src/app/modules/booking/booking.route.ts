import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('user'), BookingControllers.createBooking);
router.get('/', BookingControllers.getAllBooking);

export const BookingRoutes = router;
