export const calculateReviewsAverage = (reviews) => {
	if (!reviews || reviews.length === 0) return 0;

	const numberOfReviews = reviews.length;
	const totalRating = reviews.reduce(
		(sum, review) => sum + (review.rating || 0),
		0
	);
	const averageRating = totalRating / numberOfReviews;

	return Math.floor(averageRating * 10) / 10;
};
