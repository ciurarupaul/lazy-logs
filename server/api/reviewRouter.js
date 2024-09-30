import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import reviewController from "../controllers/reviewController.js";

dotenv.config();

const app = express();

const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
	console.log("DB connection successful!");
});

app.use(express.json());

app.get("/", reviewController.getAllReviews);
app.post("/", reviewController.createReview);

app.get("/:id", reviewController.getReview);
app.patch("/:id", reviewController.updateReview);
app.delete("/:id", reviewController.deleteReview);

export default app;
