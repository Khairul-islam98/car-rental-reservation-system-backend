import { Router } from 'express';
import { CarRoutes } from '../modules/car/car.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/cars',
    route: CarRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
