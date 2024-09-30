import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import globalErrorHandler from "../controllers/errorController.js";
import AppError from "../utils/appError.js";
import bookingRouter from "./bookingRouter.js";
import listingRouter from "./listingRouter.js";
import reviewRouter from "./reviewRouter.js";
import userRouter from "./userRouter.js";
import wishlistRouter from "./wishlistRouter.js";

dotenv.config();
const app = express();

app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true,
	})
);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// could also include morgan, helmet, rateLimiter, compression later

// connect to db
const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
	console.log("DB connection successful!");
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api/bookings", bookingRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/wishlist", wishlistRouter);

// handle undefined routes
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		status: "error",
		message: err.message,
	});
});

export default app;
