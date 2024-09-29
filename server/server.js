import mongoose from "mongoose"; // ObjectDataModelling library for MongoDB and Node.js ; Helps with schema based data modelling
import dotenv from "dotenv";
// used to load environmental variables (from .env files)
import app from "./api/index.js";

dotenv.config();

// <--- connect to db ---> (after creating project + cluster on Atlas)

const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
	console.log("DB connection successful!");
});

// <--- listen for changes --->

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App is running on port ${port}...`);
});
