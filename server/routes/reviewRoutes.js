const express = require("express");
const reviewController = require("./../controllers/reviewController");

const router = express.Router({ mergeParams: true });
// allows routes to access params from the nested tour router

// protection middleware

router
	.route("/")
	.get(reviewController.getAllReviews)
	.post(reviewController.setListingUserIds, reviewController.createReview);

router
	.route("/:id")
	.get(reviewController.getReview)
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);

module.exports = router;
