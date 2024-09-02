"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Car',
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0,
    },
    isBooked: {
        type: String,
        enum: ['unconfirmed', 'confirmed', 'cancelled'],
        default: 'unconfirmed',
        required: true,
    },
    payment: {
        type: String,
        enum: ['pending', 'paid'],
    },
    gps: {
        type: Boolean,
        default: false,
    },
    childSeat: {
        type: Boolean,
        default: false,
    },
    drivingLicense: {
        type: String,
    },
    nidOrPassport: {
        type: String,
    },
    phone: {
        type: String,
    },
    basicInsurance: {
        type: Boolean,
        default: false,
    },
    premiumInsurance: {
        type: Boolean,
        default: false,
    },
    fullInsurance: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
