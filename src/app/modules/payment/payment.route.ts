import { Router } from 'express';
import { paymentControler, paymentController } from './payment.controller';

const router = Router();

router.post('/initiate-payment', paymentController.initiatePayment);

router.post('/confirmation', paymentControler.confirmationController);

export const PaymentRoutes = router;
