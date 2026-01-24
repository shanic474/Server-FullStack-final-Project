import express from "express";
import connectDb from "./database/connectDb.js";
import cors from "cors";
import dotenv from 'dotenv';
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Routers
import productRouter from "./routers/product.router.js";
import userRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.router.js";
import orderRouter from "./routers/order.router.js";
import categoryRouter from "./routers/category.router.js";
import "./models/category.model.js";
import "./models/product.model.js";





// create an express app
const app = express();


const PORT = process.env.PORT || 3000;
dotenv.config();
connectDb();

// middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


// routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", categoryRouter);



// make the app listen on port 3000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});