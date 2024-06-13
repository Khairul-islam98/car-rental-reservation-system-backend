/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const registerIntoDB = async (payload: TUser) => {
  // checking user exists
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user already exist !');
  }
  const result = await User.create(payload);
  return result;
};
const login = async (payload: TLoginUser) => {
  // checking user exists
  const user = await User.isUserExist(payload.email);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  // check password matche
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'password do not matched!');
  }
  // token create
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });
  return {
    user,
    accessToken,
  };
};
export const AuthServices = {
  registerIntoDB,
  login,
};
