import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import globalErrorHandler from "../controllers/errorController.js";
import bookingRouter from "../routes/bookingRoutes.js";
import listingRouter from "../routes/listingRoutes.js";
import reviewRouter from "../routes/reviewRoutes.js";
import userRouter from "../routes/userRoutes.js";
import wishlistRouter from "../routes/wishlistRouter.js";
import AppError from "../utils/appError.js";

const app = express();

app.use(
	cors({
		origin: [
			"https://lazy-logs-server.vercel.app/",
			"http://localhost:3000",
			"http://localhost:5173",
		],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/bookings", bookingRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/wishlist", wishlistRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

let isConnected = false;
const connectToDatabase = async () => {
	if (isConnected) {
		return;
	}

	try {
		const DB = process.env.DATABASE.replace(
			"<password>",
			process.env.DATABASE_PASSWORD
		);
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log("DB connection successful!");
	} catch (error) {
		console.error("DB connection error:", error);
		throw new Error("Failed to connect to the database");
	}
};

// Vercel Serverless Function
export default async function handler(req, res) {
	await connectToDatabase();
	app(req, res);
}
