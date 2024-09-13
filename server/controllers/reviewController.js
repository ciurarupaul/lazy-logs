import Review from "./../models/reviewModel.js";
import handlerFactory from "./handlerFactory.js";

const reviewController = {
	getAllReviews: handlerFactory.getAll(Review),
	getReview: handlerFactory.getOne(Review),
	createReview: handlerFactory.createOne(Review),
	updateReview: handlerFactory.updateOne(Review),
	deleteReview: handlerFactory.deleteOne(Review),
};

export default reviewController;
