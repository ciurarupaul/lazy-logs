import express from "express";
import bookingRouter from "./bookingRoutes.js";
import listingRouter from "./listingRoutes.js";
import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

const router = express.Router({ mergeParams: true });

router.use("/:userId/bookings", bookingRouter);
router.use("/:userId/listings", listingRouter);

router.get("/isLoggedIn", authController.isLoggedIn);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// get the user based on inputed email, to check if they have an account
router.get("/me", userController.getUserByEmail);

// user must be logged in to interact with these
// router.use(authController.protect);

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
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default router;
