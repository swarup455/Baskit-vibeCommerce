import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Cart } from "../models/cart.model.js";
import fs from "fs";
import path from "path";

//get sample products
export const getMock = asyncHandler(async (req, res) => {
    const file = path.join(process.cwd(), "data", "products.json");
    const products = JSON.parse(fs.readFileSync(file, "utf-8"));

    return res
        .status(200)
        .json(
            new ApiResponse(200, products, "Products fetched successfullly!!")
        )
})

//add products to cart
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, qty } = req.body;

    const file = path.join(process.cwd(), "data", "products.json");
    const products = JSON.parse(fs.readFileSync(file, "utf-8"));

    const product = products.find((p) => p.id === productId);
    if (!product) {
        throw new ApiError(404, "Product not found!");
    }

    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized access – please log in.");
    }

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
        existingItem.qty += qty || 1;
        await existingItem.save();

        return res.status(200).json(
            new ApiResponse(200, existingItem, "Cart updated successfully!")
        );
    }

    const newProduct = await Cart.create({
        userId,
        productId: product.id,
        productName: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        stock: product.stock,
        qty: qty || 1,
    });

    return res.status(201).json(
        new ApiResponse(201, newProduct, "Product added to cart successfully!")
    );
})

//remove products from cart
export const removeFromCart = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const userId = req?.user?._id;
    if (!userId) {
        throw new ApiError(404, "User not found!");
    }

    const product = await Cart.findOne({ userId, productId: id });
    if (!product) {
        throw new ApiError(404, "Product not found in cart!!");
    }

    await Cart.deleteOne({ userId, productId: product.productId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, { productId: id }, "Product removed successfully!!")
        )
})

//get cart items
export const getCart = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;

    if (!userId) {
        throw new ApiError(404, "User not found!!");
    }

    const cartProducts = await Cart.find({ userId });
    const totalAmount = cartProducts.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, { cartProducts, totalAmount }, "Cart removed successfully!!")
        )
})

// checkout
export const checkoutCart = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;
    const name = req?.user?.fullName;
    const email = req?.user?.email;

    if (!userId) {
        throw new ApiError(401, "Unauthorized please log in.");
    }
    if (!name || !email) {
        throw new ApiError(400, "Name and email are not available.");
    }
    const items = await Cart.find({ userId });
    if (!items.length) throw new ApiError(400, "Your cart is empty.");

    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const shipping = 0;
    const taxes = 0;
    const total = subtotal + shipping + taxes;

    const orderId = `ORD-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const receipt = {
        orderId,
        timestamp,
        customer: { name, email, userId },
        items: items.map((it) => ({
            productId: it.productId,
            productName: it.productName,
            price: it.price,
            qty: it.qty,
            lineTotal: it.price * it.qty,
        })),
        subtotal,
        shipping,
        taxes,
        total,
        note: "Mock checkout successful (no payment processed).",
    };

    await Cart.deleteMany({ userId });

    return res
        .status(201)
        .json(new ApiResponse(201, receipt, "Checkout successful!"));
});