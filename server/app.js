const express = require("express");
const cors = require("cors");

const bookingRouter = require("./routes/bookingRoutes");
const listingRouter = require("./routes/listingRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:5173"],
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

module.exports = app;
