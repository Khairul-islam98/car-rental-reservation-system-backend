/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';
import bcrypt from 'bcrypt';

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
  if (user.status === 'block') {
    throw new AppError(httpStatus.BAD_REQUEST, `${user.name} you are block`);
  }
  // check password matche
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'password do not matched!');
  }
  // token create
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });
  return {
    user,
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  if (user.status === 'block') {
    throw new AppError(httpStatus.BAD_REQUEST, `${user.name} you are block`);
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30m',
  });

  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
};
const resetPassword = async (payload: {
  email: string;
  newPassword: string;
  token: string;
}) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  if (user.status === 'block') {
    throw new AppError(httpStatus.BAD_REQUEST, `${user.name} you are block`);
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }
  const decoded = jwt.verify(
    payload.token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    { email: decoded.email, role: decoded.role },
    {
      password: newHashedPassword,
    },
  );
};

export const AuthServices = {
  registerIntoDB,
  login,
  forgetPassword,
  resetPassword,
};
