import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const car = await Car.findOne({ _id: payload.car });
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found !');
  }

  // Ensure the user exists
  const user = await User.findById(payload.user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // Create the booking
  const booking = new Booking({
    ...payload,
    isBooked: 'confirmed',
  });
  await booking.save();

  // Update car status to unavailable
  car.status = 'unavailable';
  await car.save();

  const result = (await booking.populate('user')).populate('car');

  return result;
};

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate('user').populate('car'),
    query,
  ).filter();
  const result = await bookingQuery.modelQuery;
  return result;
};

const getMyBookingFromDB = async (userData: string) => {
  const user = await User.findById(userData);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await Booking.find({ user: userData })
    .populate('user')
    .populate('car');
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
};
