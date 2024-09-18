import { useEffect, useMemo, useState } from "react";
import { getListings } from "../services/apiListings";

const useListings = (filters, sortOption) => {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getListings();
				setListings(response.data.data);
			} catch (err) {
				// will deal with this later
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const calculateReviewsAverage = useMemo(
		() => (reviews) => {
			if (!reviews || reviews.length === 0) return 0;

			const numberOfReviews = reviews.length;
			const totalRating = reviews.reduce(
				(sum, review) => sum + (review.rating || 0),
				0
			);
			const averageRating = totalRating / numberOfReviews;

			return Math.floor(averageRating * 10) / 10;
		},
		[]
	);

	const filteredListings = useMemo(() => {
		let filtered = [...listings];

		// Filter
		if (filters.guestRange && filters.guestRange !== "all") {
			if (filters.guestRange === "1-4") {
				filtered = filtered.filter(
					(listing) =>
						listing.listingDetails.maxGuests >= 1 &&
						listing.listingDetails.maxGuests <= 4
				);
			} else if (filters.guestRange === "5-15") {
				filtered = filtered.filter(
					(listing) =>
						listing.listingDetails.maxGuests >= 5 &&
						listing.listingDetails.maxGuests <= 15
				);
			} else if (filters.guestRange === "16+") {
				filtered = filtered.filter(
					(listing) => listing.listingDetails.maxGuests >= 16
				);
			}
		}

		// Sort
		if (sortOption === "popular") {
			filtered.sort((a, b) => b.reviews.length - a.reviews.length);
		} else if (sortOption === "priceAsc") {
			filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
		} else if (sortOption === "priceDesc") {
			filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
		} else if (sortOption === "ratingAsc") {
			filtered.sort(
				(a, b) =>
					calculateReviewsAverage(a.reviews) -
					calculateReviewsAverage(b.reviews)
			);
		} else if (sortOption === "ratingDesc") {
			filtered.sort(
				(a, b) =>
					calculateReviewsAverage(b.reviews) -
					calculateReviewsAverage(a.reviews)
			);
		}

		return filtered;
	}, [filters, sortOption, listings, calculateReviewsAverage]);

	return { filteredListings, loading };
};

export default useListings;
