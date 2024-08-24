import cors from "cors";
import express from "express";

import bookingRouter from "./routes/bookingRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(express.json()); // !!! so the app can parse incoming json

app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:5173"],
		// accept multiple origins
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"Access-Control-Allow-Methods",
			"Access-Control-Request-Headers",
		],
		credentials: true,
		preflightContinue: false,
	})
);

// routes
app.use("/api/booking", bookingRouter);
app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);

export default app;
