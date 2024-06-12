import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';

const registerIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user already exist !');
  }
  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  registerIntoDB,
};
