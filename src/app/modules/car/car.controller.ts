import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';

const createCars = catchAsync(async (req, res) => {
  const result = await CarServices.createCarsIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Car created successfully',
    data: result,
  });
});
const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});
// const getSingleCars = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await CarServices.getSingleCarsFromDB(id);
//   sendResponse(res, {

//   })
// });

export const CarControllers = {
  createCars,
  getAllCars,
};
