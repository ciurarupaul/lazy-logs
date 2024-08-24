import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

import Listing from "./models/listingModel.js";
import User from "./models/userModel.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

async function connectToDatabase() {
	try {
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (err) {
		console.error("MongoDB connection error:", err);
		process.exit(1);
	}
}

async function seedDatabase() {
	try {
		const data = JSON.parse(
			fs.readFileSync(path.join(__dirname, "mockData.json"), "utf-8")
		);

		await User.deleteMany({});
		await Listing.deleteMany({});

		await User.insertMany(data.users);
		await Listing.insertMany(data.listings);

		console.log("Database seeding completed");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
}

async function main() {
	await connectToDatabase();
	await seedDatabase();
}

main();
