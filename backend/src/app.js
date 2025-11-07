import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);

export default app;