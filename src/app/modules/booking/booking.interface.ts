import { Types } from 'mongoose';

export type TBooking = {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
  isBooked: 'unconfirmed' | 'confirmed';
};
