import { Types } from 'mongoose';

export type TBooking = {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
  isBooked: 'unconfirmed' | 'confirmed';
};
