import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const {
    carId,
    date,
    startTime,
    drivingLicense,
    gps,
    childSeat,
    nidOrPassport,
    phone,
    premiumInsurance,
    fullInsurance,
    basicInsurance,
  } = req.body;
  const userId = req?.user?._id;
  const result = await BookingServices.createBookingIntoDB({
    date,
    startTime,
    endTime: null,
    user: userId,
    car: carId,
    totalCost: 0,
    isBooked: 'unconfirmed',
    payment: null,
    gps,
    childSeat,
    drivingLicense,
    nidOrPassport,
    phone,
    premiumInsurance,
    fullInsurance,
    basicInsurance,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car booked successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getUpdateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isBooked, ...rest } = req.body;

  if (!['confirmed', 'cancelled'].includes(isBooked)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Invalid booking status',
    });
  }

  const updateData = { ...rest, isBooked };

  const result = await BookingServices.getUpdateBookingIntoDB(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const getMyBooking = catchAsync(async (req, res) => {
  const userData = req?.user?._id;
  const result = await BookingServices.getMyBookingFromDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});
const updateMyBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getUpdateMyBookingFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Booking update successfully',
    data: result,
  });
});
const deleteMyBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteMyBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete My Booking successfully',
    data: result,
  });
});

const adminCountDashboard = catchAsync(async (req, res) => {
  const result = await BookingServices.adminCountDashboardFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'total dashboard count successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUpdateBooking,
  getMyBooking,
  updateMyBooking,
  deleteMyBooking,
  adminCountDashboard,
};
