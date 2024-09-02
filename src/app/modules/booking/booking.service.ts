import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { totalCostCalculation } from '../car/car.utils';

const createBookingIntoDB = async (payload: TBooking) => {
  const booking = await Booking.create(payload);

  const result = (await booking.populate('user')).populate('car');

  return result;
};

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  // get data at QueryBuilder and filter implement
  const bookingQuery = new QueryBuilder(
    Booking.find().populate('user').populate('car'),
    query,
  ).filter();
  const result = await bookingQuery.modelQuery;
  return result;
};

const getUpdateBookingIntoDB = async (
  id: string,
  payload: Partial<TBooking>,
) => {
  try {
    // const car = await Car.findOne({ _id: payload.car });
    // if (!car) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
    // }

    // if (payload.isBooked === 'confirmed') {
    //   if (car.status === 'unavailable') {
    //     throw new AppError(
    //       httpStatus.CONFLICT,
    //       'This car is already reserved!',
    //     );
    //   }
    //   car.status = 'unavailable';
    //   await car.save();
    // } else if (payload.isBooked === 'cancelled') {
    //   car.status = 'available';
    //   await car.save();
    // }
    await Car.findByIdAndUpdate(
      payload.car,
      { status: 'unavilable' },
      { new: true },
    );

    const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
    }
    return result;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
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

const getUpdateMyBookingFromDB = async (
  id: string,
  payload: { startTime: string; endTime: string },
) => {
  const bookingData = await Booking.findById(id);
  if (!bookingData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
  }

  const carData = await Car.findById(bookingData.car);
  if (!carData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
  }

  const pricePerHour = carData.pricePerHour;
  const { startTime, endTime } = payload;

  // Calculate total cost
  const totalCost = totalCostCalculation(startTime, endTime, pricePerHour);

  console.log('Total Cost:', totalCost);

  // Update the booking with the calculated cost
  const result = await Booking.findByIdAndUpdate(
    id,
    { ...payload, totalCost },
    { new: true },
  );

  return result;
};

const deleteMyBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

const getTotalBookingsFromDB = async () => {
  const totalBookings = await Booking.countDocuments();
  return totalBookings;
};

const getTotalAvailableCarsFromDB = async () => {
  const totalAvailableCars = await Car.countDocuments({ status: 'available' });
  return totalAvailableCars;
};

const getTotalRevenueFromDB = async () => {
  const totalRevenue = await Booking.aggregate([
    { $match: { payment: 'paid' } }, // Assuming you have a paymentStatus field
    { $group: { _id: null, totalRevenue: { $sum: '$totalCost' } } },
  ]);
  return totalRevenue[0]?.totalRevenue || 0;
};

const adminCountDashboardFromDB = async () => {
  const totalBookings = await getTotalBookingsFromDB();
  const totalAvailableCars = await getTotalAvailableCarsFromDB();
  const totalRevenue = await getTotalRevenueFromDB();

  return {
    totalBookings,
    totalAvailableCars,
    totalRevenue,
  };
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getUpdateBookingIntoDB,
  getMyBookingFromDB,
  getUpdateMyBookingFromDB,
  deleteMyBookingFromDB,
  adminCountDashboardFromDB,
};
