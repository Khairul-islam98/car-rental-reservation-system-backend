"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    bookingId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
}, {
    timestamps: true,
});
exports.Payment = (0, mongoose_1.model)('Payment', PaymentSchema);
