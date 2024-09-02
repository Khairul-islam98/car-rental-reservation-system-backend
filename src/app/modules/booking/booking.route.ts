import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('user'), BookingControllers.createBooking);
router.get('/', auth('admin'), BookingControllers.getAllBooking);
router.put('/:id', auth('admin'), BookingControllers.getUpdateBooking);
router.get('/my-bookings', auth('user'), BookingControllers.getMyBooking);
router.put(
  '/my-bookings/:id',
  auth('user'),
  BookingControllers.updateMyBooking,
);
router.delete(
  '/my-bookings/:id',
  auth('user'),
  BookingControllers.deleteMyBooking,
);
router.get('/dashboard', BookingControllers.adminCountDashboard);

export const BookingRoutes = router;
