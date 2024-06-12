import { TCar } from './car.interface';
import { Car } from './car.model';

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

export const CarServices = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getSingleCarsFromDB,
};
