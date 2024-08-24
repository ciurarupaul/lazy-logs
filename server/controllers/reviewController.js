import Review from "./../models/reviewModel.js";
import handlerFactory from "./handlerFactory.js";

const reviewController = {
	setListingUserIds: (req, res, next) => {
		if (!req.body.listing) req.body.listing = req.params.listingId;
		if (!req.body.user) req.body.user = req.user.id;

		next();
	},

	getAllReviews: handlerFactory.getAll(Review),
	getReview: handlerFactory.getOne(Review),
	createReview: handlerFactory.createOne(Review),
	updateReview: handlerFactory.updateOne(Review),
	deleteReview: handlerFactory.deleteOne(Review),
};

export default reviewController;
