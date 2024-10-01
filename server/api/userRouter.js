import express from "express";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.get("/isLoggedIn", authController.isLoggedIn);
userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);
userRouter.post("/forgotPassword", authController.forgotPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);

userRouter.get("/me", userController.getUserByEmail);

userRouter.use(authController.protect);

userRouter.patch("/updateMyPassword", authController.updatePassword);
userRouter.patch(
	"/updateMe",
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);

userRouter
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);

userRouter
	.route("/:id")
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default userRouter;
