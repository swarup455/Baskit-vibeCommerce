import { Router } from "express"
import { getMock, addToCart, removeFromCart, getCart, checkoutCart } from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const productRouter = Router();

productRouter.get("/", getMock);
productRouter.post("/cart", verifyJwt, addToCart);
productRouter.delete("/cart/:id", verifyJwt, removeFromCart);
productRouter.get("/get-cart", verifyJwt, getCart);
productRouter.get("/cart/checkout", verifyJwt, checkoutCart);

export default productRouter