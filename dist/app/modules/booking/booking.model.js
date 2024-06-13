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
        required: true,
        ref: 'Car',
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0,
    },
    isBooked: {
        type: String,
        enum: ['unconfirmed', 'confirmed'],
        default: 'unconfirmed',
        required: true,
    },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
