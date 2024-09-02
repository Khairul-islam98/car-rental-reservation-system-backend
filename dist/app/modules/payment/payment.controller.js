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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentControler = exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
// Import the payment service
exports.paymentController = {
    initiatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookingId, email, cost } = req.body; // Extract payment details from request body
            try {
                const paymentUrl = yield payment_service_1.paymentService.initializePayment(bookingId, email, cost);
                res.json({ success: true, paymentUrl });
            }
            catch (error) {
                res.status(500).json({ success: false });
            }
        });
    },
};
const confirmationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, status } = req.query;
    const result = yield payment_service_1.paymentServices.confirmationService(transactionId, status);
    res.send(result);
});
exports.paymentControler = {
    confirmationController,
};
