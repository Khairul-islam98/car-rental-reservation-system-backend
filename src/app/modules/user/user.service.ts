import { User } from './user.model';
import { TUser } from './user.interface';

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getUpdateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const updateProfileFromDB = async (email: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ email }, payload);
  return result;
};

const getMyProfileFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

export const UserServices = {
  getAllUserFromDB,
  getUpdateUserIntoDB,
  deleteUserFromDB,
  updateProfileFromDB,
  getMyProfileFromDB,
};
