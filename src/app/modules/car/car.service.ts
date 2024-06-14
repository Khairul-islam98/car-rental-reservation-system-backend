/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TCar } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { Booking } from '../booking/booking.model';
import { User } from '../user/user.model';
import { totalCostCalculation } from './car.utils';

const createCarsIntoDB = async (payload: TCar) => {
  // create a car
  const result = await Car.create(payload);
  return result;
};
const getAllCarsFromDB = async () => {
  // get all cars
  const result = await Car.find();
  return result;
};
const getSingleCarsFromDB = async (id: string) => {
  // get single car
  const result = await Car.findById(id);
  return result;
};
const updateCarsIntoDB = async (id: string, payload: Partial<TCar>) => {
  // checking car id is exists
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  // update car information in DB
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteCarsFromDB = async (id: string) => {
  // checking car id is exists
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  // car partial delete from dB
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const returnCarIntoDB = async (
  user: any,
  data: { bookingId: string; endTime: string },
) => {
  // checking user exists
  const userData = await User.isUserExist(user?.email);
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  // checking booking id is exists
  const bookingData = await Booking.findById(data.bookingId);
  if (!bookingData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
  }
  // checking car is exists
  const carData = await Car.findById(bookingData?.car);
  if (!carData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
  }

  const pricePerHour = carData?.pricePerHour;

  const bookingDataStartTime = bookingData?.startTime;
  // total cost calculation
  const totalCost = totalCostCalculation(
    bookingDataStartTime,
    data.endTime,
    pricePerHour,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // car status unavailable to availabe set DB
    const updatedCarData = await Car.findByIdAndUpdate(
      bookingData?.car,
      { status: 'available' },
      { new: true, session },
    );
    if (!updatedCarData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update data!');
    }
    // save totalcost in DB
    const result = await Booking.findByIdAndUpdate(
      data.bookingId,
      {
        endTime: data.endTime,
        totalCost: totalCost,
      },
      { new: true, session },
    )
      .populate('car')
      .populate('user');

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update data!');
    }

    await session.commitTransaction();
    await session.endSession();

    const resultData = result.toObject();
    delete (resultData as any).isBooked;
    return resultData;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Bad request!');
  }
};
export const CarServices = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getSingleCarsFromDB,
  updateCarsIntoDB,
  deleteCarsFromDB,
  returnCarIntoDB,
};
