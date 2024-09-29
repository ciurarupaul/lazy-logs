import app from "../app";
import { connectToDatabase } from "../server";

export default async (req, res) => {
	await connectToDatabase();
	app(req, res);
};
