import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    productId: {
        type: String,
        required: true,
        index: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        default: 1,
    }
}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartSchema);