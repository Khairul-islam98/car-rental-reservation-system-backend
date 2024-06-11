import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  car: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Car',
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0,
  },
  isBooked: {
    type: String,
    enum: ['unconfirmed', 'confirmed'],
    default: 'unconfirmed',
    required: true,
  },
});

export const Booking = model<TBooking>('Booking', bookingSchema);
