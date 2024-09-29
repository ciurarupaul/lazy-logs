import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

let isConnected;

export const connectToDatabase = async () => {
	if (isConnected) {
		return;
	}

	try {
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

// Ensure the server listens for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
