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
  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});
const getSingleCars = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarsFromDB(id);
  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  });
});
const updateCars = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.updateCarsIntoDB(id, req.body);
  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});
const deleteCars = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarsFromDB(id);
  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});
const returnCar = catchAsync(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const result = await CarServices.returnCarIntoDB(user, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: result,
  });
});

export const CarControllers = {
  createCars,
  getAllCars,
  getSingleCars,
  updateCars,
  deleteCars,
  returnCar,
};
