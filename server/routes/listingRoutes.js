import express from "express";
import listingController from "../controllers/listingController.js";
import reviewRouter from "../routes/reviewRoutes.js";

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

export default router;
