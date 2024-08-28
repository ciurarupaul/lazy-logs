import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import bookingRouter from "./routes/bookingRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(
	cors({
		// accept multiple origins
		origin: ["http://localhost:3000", "http://localhost:5173"],
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
app.use("/api/booking", bookingRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);

//
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		status: "error",
		message: err.message,
	});
});

export default app;
