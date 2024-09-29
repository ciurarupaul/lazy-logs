import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import bookingRouter from "./routes/bookingRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import userRouter from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
import wishlistRouter from "./routes/wishlistRouter.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

app.use(
	cors({
		// accept multiple origins
		origin: [
			"https://lazy-logs-server.vercel.app/",
			"http://localhost:3000",
			"http://localhost:5173",
		],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"Access-Control-Allow-Origin",
			"Access-Control-Allow-Methods",
			"Access-Control-Request-Headers",
			"Access-Control-Allow-Credentials",
		],
		credentials: true,
	})
);

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); // For parsing cookies

// Routes
app.use("/api/bookings", bookingRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/wishlist", wishlistRouter);

// weird error, doesnt allow /api/users/wishlist, but is ok without users ??? returns server error 500

// Handle undefined routes
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
