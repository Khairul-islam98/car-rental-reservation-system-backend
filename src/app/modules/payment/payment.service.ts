import axios from 'axios';
import { Payment } from './payment.model';
import { IPayment } from './payment.interface';
import config from '../../config';
import { Booking } from '../booking/booking.model';
import { readFileSync } from 'fs';
import { join } from 'path';

export const paymentService = {
  async initializePayment(
    bookingId: string,
    email: string,
    cost: number,
  ): Promise<string> {
    const transactionId = `TXN-${Date.now()}`;

    const payload = {
      store_id: config.store_id,
      signature_key: config.signature_key,
      cus_email: email,
      cus_phone: '0123456789',
      amount: cost,
      cus_name: 'John Doe',
      tran_id: transactionId,
      currency: 'BDT',
      success_url: `https://car-rental-reservation-system-six.vercel.app/api/payment/confirmation?transactionId=${transactionId}&status=success`,
      fail_url: 'http://www.merchantdomain.com/failedpage.html',
      cancel_url: 'http://www.merchantdomain.com/cancelpage.html',
      desc: bookingId,
      type: 'json',
    };

    try {
      const response = await axios.post(config.payment_url as string, payload);

      if (response.data.result === 'true') {
        const { payment_url } = response.data;

        await Payment.create<IPayment>({
          email,
          cost,
          transactionId,
          date: new Date().toISOString(),
          bookingId,
          status: 'pending',
        });

        return payment_url;
      } else {
        throw new Error('Failed to get payment URL');
      }
    } catch (error) {
      console.error('Payment initialization failed:', error);
      throw new Error('Payment initialization failed');
    }
  },
};

const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    console.error('Payment validation failed:', err);
    throw new Error('Payment validation failed!');
  }
};

const confirmationService = async (transactionId: string, status: string) => {
  // Step 1: Verify the payment
  const verifyResponse = await verifyPayment(transactionId);

  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    // Step 2: Update the payment status
    const paymentUpdateResult = await Payment.findOneAndUpdate(
      { transactionId },
      { status: 'paid' },
    );

    if (!paymentUpdateResult) {
      throw new Error('Failed to update payment status');
    }

    const bookingId = paymentUpdateResult.bookingId;

    const bookingUpdateResult = await Booking.findOneAndUpdate(
      { _id: bookingId },
      { payment: 'paid' },
    );

    if (!bookingUpdateResult) {
      throw new Error('Failed to update booking status');
    }

    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  // Step 4: Read and modify the confirmation template
  const filePath = join(__dirname, '../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
