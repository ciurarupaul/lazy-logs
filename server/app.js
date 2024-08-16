const express = require("express");

const cabinRouter = require("./routes/cabinRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// routes
// app.use("/api/users", userRouter);
// app.use("/api/cabins", cabinRouter);
// app.use("/api/reviews", reviewRouter);

module.exports = app;
