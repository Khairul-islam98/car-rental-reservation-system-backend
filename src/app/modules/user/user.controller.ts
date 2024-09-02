import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User are retrived successfully',
    data: result,
  });
});
const getUpdateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUpdateUserIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Update successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete User successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.updateProfileFromDB(email, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Profile Update successfully',
    data: result,
  });
});
const getMyProfile = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getMyProfileFromDB(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user profile are retrive successfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  getUpdateUser,
  deleteUser,
  updateProfile,
  getMyProfile,
};
