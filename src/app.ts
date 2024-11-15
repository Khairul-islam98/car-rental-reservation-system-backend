import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
import cookieParser from 'cookie-parser';
import path from 'path';

// parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://car-rentals-services.netlify.app',
      'http://carrents.me',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To Car Rental Reservation System');
});
app.use(express.static(path.join(__dirname, '')));
// global error handler
app.use(globalErrorHandler);

// Api Not Found
app.use(notFound);

export default app;
