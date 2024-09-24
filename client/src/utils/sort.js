export const sortListings = (listings, sortOption, calculateReviewsAverage) => {
	let sorted = [...listings];

	if (sortOption === "popular") {
		sorted.sort((a, b) => b.reviews.length - a.reviews.length);
	} else if (sortOption === "priceAsc") {
		sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
	} else if (sortOption === "priceDesc") {
		sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
	} else if (sortOption === "ratingAsc") {
		sorted.sort(
			(a, b) =>
				calculateReviewsAverage(a.reviews) -
				calculateReviewsAverage(b.reviews)
		);
	} else if (sortOption === "ratingDesc") {
		sorted.sort(
			(a, b) =>
				calculateReviewsAverage(b.reviews) -
				calculateReviewsAverage(a.reviews)
		);
	}

	return sorted;
};
