"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_route_1 = require("../modules/car/car.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/cars',
        route: car_route_1.CarRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
