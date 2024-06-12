import httpStatus from 'http-status';
import { TCar } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';

const createCarsIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
const getAllCarsFromDB = async () => {
  const result = await Car.find();
  return result;
};
const getSingleCarsFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};
const updateCarsIntoDB = async (id: string, payload: Partial<TCar>) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteCarsFromDB = async (id: string) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is not found !');
  }
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
export const CarServices = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getSingleCarsFromDB,
  updateCarsIntoDB,
  deleteCarsFromDB,
};
