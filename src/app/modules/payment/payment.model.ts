import { Schema, model } from 'mongoose';
import { IPayment } from './payment.interface';

const PaymentSchema = new Schema<IPayment>(
  {
    email: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    bookingId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<IPayment>('Payment', PaymentSchema);
