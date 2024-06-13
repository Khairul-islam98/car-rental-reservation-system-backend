import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Car',
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
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
