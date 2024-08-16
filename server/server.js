const mongoose = require("mongoose");
// ObjectDataModelling library for MongoDB and Node.js ; Helps with schema based data modelling
const dotenv = require("dotenv");
// used to load environmental variables (from .env files)

dotenv.config({ path: "./config.env" });
const app = require("./app");

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
