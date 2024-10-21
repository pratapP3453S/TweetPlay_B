import crypto from "crypto"; // or const crypto = require("crypto");
import { PremiumPrice } from "../models/payment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paymentInstance } from "../utils/paymentInstance.js";
import { User } from "../models/user.model.js";

// const URL = "http://localhost:5173"
const URL = "tweetplay.vercel.app";

const changeUserPremiumValue = async (userId) => {
    try {
        const user = await User.findById(userId);
        user.premium = true;
        await user.save({ validateBeforeSave: false });
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong when updating premium value in database"
        );
    }
};

const checkout = asyncHandler(async (req, res) => {
    const premiumPriceDoc = await PremiumPrice.findOne();
    if (!premiumPriceDoc) {
        throw new ApiError(404, "Premium price not found in database");
    }
    const options = {
        amount: Number(premiumPriceDoc.premiumPrice) * 100,
        currency: "INR",
    };
    const order = await paymentInstance.orders.create(options);

    console.log(order);
    res.status(200).json({
        success: true,
        order,
    });
});

const paymentVerification = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isSignatureValid = razorpay_signature === expectedSignature;
    if (isSignatureValid) {
        //database here
        await changeUserPremiumValue(userId);

        return res.redirect(`https://tweetplay.vercel.app/paymentsuccess`);
    }

    // return res.status(200).json({
    //     success: true,
    //     isSignatureValid: razorpay_signature === expectedSignature,
    // });
    // res.writeHead(301, {
    //     Location: "https://tweetplay.vercel.app/paymentunsuccessful",
    // });
    // return res.end();
});

export default paymentVerification;

export { checkout, paymentVerification };
