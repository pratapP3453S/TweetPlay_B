import mongoose, { Schema } from "mongoose";

const premiumPriceSchema = new Schema({
    premiumPrice: {
        type: Number,
        required: true,
        default: 99,
    }
})
const PremiumPrice = mongoose.model("PremiumPrice", premiumPriceSchema);
export { PremiumPrice }