import { Request, Response } from 'express';
import { paymentService, paymentServices } from './payment.service';
// Import the payment service

export const paymentController = {
  async initiatePayment(req: Request, res: Response) {
    const { bookingId, email, cost } = req.body; // Extract payment details from request body

    try {
      const paymentUrl = await paymentService.initializePayment(
        bookingId,
        email,
        cost,
      );
      res.json({ success: true, paymentUrl });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
};

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;

  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string,
  );
  res.send(result);
};

export const paymentControler = {
  confirmationController,
};
