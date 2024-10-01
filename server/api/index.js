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

// HUGE bug here. wrote the urls with / at the end, and that caused the cors issues
// the old config didn't allow all subdomains of vercel, like this one does. it specified a few urls, which initially ended with /

app.use(
	cors({
		origin: (origin, callback) => {
			if (origin && origin.endsWith(".vercel.app")) {
				callback(null, true);
			} else {
				callback(new AppError("Not allowed by CORS"));
			}
		},
		credentials: true,
		methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
		allowedHeaders: [
			"X-CSRF-Token",
			"X-Requested-With",
			"Accept",
			"Accept-Version",
			"Content-Length",
			"Content-MD5",
			"Content-Type",
			"Date",
			"X-Api-Version",
		],
	})
);

app.use((req, res, next) => {
	console.log(`Incoming request from origin: ${req.headers.origin}`);
	next();
});

app.get("/test-cors", (req, res) => {
	res.json({ message: "CORS is working!" });
});

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
