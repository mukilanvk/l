import express from 'express';
import mongoose from 'mongoose';
import productRoute from './route/product.js';
import *  as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './route/user.js';
import orderRoute from './route/order.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT  || 5000;

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT","DELETE"], credentials: true }));
app.use(cookieParser());

app.use("/product", productRoute);
app.use("/user" , authRoute);
app.use("/order" , orderRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
