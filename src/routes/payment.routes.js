import express from 'express';
import { checkout, paymentVerification } from '../controllers/payment.controller.js';

const paymentRouter = express.Router();

paymentRouter.route("/checkout").post(checkout);
paymentRouter.route("/paymentverification/:userId").post(paymentVerification);

export default paymentRouter;