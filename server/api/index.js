import app from "../app";

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

export default async (req, res) => {
	await connectToDatabase();
	app(req, res);
};
