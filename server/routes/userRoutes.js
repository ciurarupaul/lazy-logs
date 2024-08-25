import express from "express";
import bookingRouter from "./bookingRoutes.js";
import listingRouter from "./listingRoutes.js";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

const router = express.Router({ mergeParams: true });

router.use("/:userId/bookings", bookingRouter);
router.use("/:userId/listings", listingRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// user must be logged in to interact with these
router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMyPassword", authController.updatePassword);
router.patch(
	"/updateMe",
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);

// for testing

router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default router;
