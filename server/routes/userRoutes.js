const express = require("express");
const bookingRouter = require("../routes/bookingRoutes");
const listingRouter = require("../routes/listingRoutes");
const userController = require("./../controllers/userController");

const router = express.Router({ mergeParams: true });

router.use("/:userId/bookings", bookingRouter);
router.use("/:userId/listings", listingRouter);

// auth routes

// add protection middleware here

router.get("/me", userController.getMe, userController.getUser);
router.patch(
	"/updateMe",
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
