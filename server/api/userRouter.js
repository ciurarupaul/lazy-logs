import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

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

app.get("/isLoggedIn", authController.isLoggedIn);
app.post("/signup", authController.signup);
app.post("/login", authController.login);
app.get("/logout", authController.logout);
app.post("/forgotPassword", authController.forgotPassword);
app.patch("/resetPassword/:token", authController.resetPassword);

app.get("/me", userController.getUserByEmail);

// protect below
app.use(authController.protect);

app.patch("/updateMyPassword", authController.updatePassword);
app.patch(
	"/updateMe",
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);

app.route("/").get(userController.getAllUsers).post(userController.createUser);

app.route("/:id")
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default app;
