import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authController from "../controllers/authController.js";
import wishlistController from "../controllers/wishlistController.js";

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

app.use(authController.protect);

app.get("/", wishlistController.fetchWishlist);
app.post("/", wishlistController.addToWishlist);
app.delete("/:listingId", wishlistController.removeFromWishlist);

export default app;
