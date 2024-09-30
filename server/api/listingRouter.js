import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import listingController from "../controllers/listingController.js";
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

app.get("/", listingController.getAllListings);
app.post("/", listingController.createListing);
app.get("/:id", listingController.getListing);
app.delete("/:id", listingController.deleteListing);

export default app;
