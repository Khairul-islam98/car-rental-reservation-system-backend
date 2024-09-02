export interface IPayment {
  email: string;
  cost: number;
  transactionId: string;
  bookingId: string;
  date: string;
  status: 'pending' | 'paid' | 'failed';
}
