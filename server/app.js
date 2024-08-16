const express = require("express");

const bookingRouter = require("./routes/bookingRoutes");
const cabinRouter = require("./routes/cabinRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// routes
app.use("/api/booking", bookingRouter);
app.use("/api/cabins", cabinRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);

module.exports = app;
