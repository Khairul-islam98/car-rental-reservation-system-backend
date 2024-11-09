"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = exports.paymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const payment_model_1 = require("./payment.model");
const config_1 = __importDefault(require("../../config"));
const booking_model_1 = require("../booking/booking.model");
const fs_1 = require("fs");
const path_1 = require("path");
exports.paymentService = {
    initializePayment(bookingId, email, cost) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionId = `TXN-${Date.now()}`;
            const payload = {
                store_id: config_1.default.store_id,
                signature_key: config_1.default.signature_key,
                cus_email: email,
                cus_phone: '0123456789',
                amount: cost,
                cus_name: 'John Doe',
                tran_id: transactionId,
                currency: 'BDT',
                success_url: `https://car-rental-reservation-system-one.vercel.app/api/payment/confirmation?transactionId=${transactionId}&status=success`,
                fail_url: 'http://www.merchantdomain.com/failedpage.html',
                cancel_url: 'http://www.merchantdomain.com/cancelpage.html',
                desc: bookingId,
                type: 'json',
            };
            try {
                const response = yield axios_1.default.post(config_1.default.payment_url, payload);
                if (response.data.result === 'true') {
                    const { payment_url } = response.data;
                    yield payment_model_1.Payment.create({
                        email,
                        cost,
                        transactionId,
                        date: new Date().toISOString(),
                        bookingId,
                        status: 'pending',
                    });
                    return payment_url;
                }
                else {
                    throw new Error('Failed to get payment URL');
                }
            }
            catch (error) {
                console.error('Payment initialization failed:', error);
                throw new Error('Payment initialization failed');
            }
        });
    },
};
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(config_1.default.payment_verify_url, {
            params: {
                store_id: config_1.default.store_id,
                signature_key: config_1.default.signature_key,
                type: 'json',
                request_id: tnxId,
            },
        });
        return response.data;
    }
    catch (err) {
        console.error('Payment validation failed:', err);
        throw new Error('Payment validation failed!');
    }
});
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Verify the payment
    const verifyResponse = yield verifyPayment(transactionId);
    let message = '';
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        // Step 2: Update the payment status
        const paymentUpdateResult = yield payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: 'paid' });
        if (!paymentUpdateResult) {
            throw new Error('Failed to update payment status');
        }
        const bookingId = paymentUpdateResult.bookingId;
        const bookingUpdateResult = yield booking_model_1.Booking.findOneAndUpdate({ _id: bookingId }, { payment: 'paid' });
        if (!bookingUpdateResult) {
            throw new Error('Failed to update booking status');
        }
        message = 'Successfully Paid!';
    }
    else {
        message = 'Payment Failed!';
    }
    // Step 4: Read and modify the confirmation template
    const filePath = (0, path_1.join)(__dirname, '../../../../public/confirmation.html');
    let template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    template = template.replace('{{message}}', message);
    return template;
});
exports.paymentServices = {
    confirmationService,
};
