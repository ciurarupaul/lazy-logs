import mongoose from "mongoose";
import app from "../app.js";

let isConnected = false;

const connectToDatabase = async () => {
	if (isConnected) {
		return;
	}

	try {
		const DB = process.env.DATABASE.replace(
			"<password>",
			process.env.DATABASE_PASSWORD
		);
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log("DB connection successful!");
	} catch (error) {
		console.error("DB connection error:", error);
		throw new Error("Failed to connect to the database");
	}
};

export default async function handler(req, res) {
	await connectToDatabase();
	app(req, res);
}
