const express = require("express");
const reviewRouter = require("../routes/reviewRoutes");
const listingController = require("../controllers/listingController");

const router = express.Router({ mergeParams: true });
// allows routes to access params from the nested router

router.use("/:listingId/reviews", reviewRouter);

router
	.route("/")
	.get(listingController.getAllListings)
	.post(listingController.createListing);

router
	.route("/:id")
	.get(listingController.getListing)
	.patch(
		listingController.uploadListingImages,
		listingController.resizeListingImages,
		listingController.updateListing
	)
	.delete(listingController.deleteListing);

module.exports = router;
