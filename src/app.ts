import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5175',
      'http://localhost:5177',
      'http://localhost:5174',
      'http://localhost:5176',
    ],
    credentials: true,
  }),
);

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To Car Rental Reservation System');
});

// global error handler
app.use(globalErrorHandler);

// Api Not Found
app.use(notFound);

export default app;
