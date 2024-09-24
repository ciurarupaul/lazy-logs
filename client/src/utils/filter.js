export const filterListings = (listings, filters) => {
	let filtered = [...listings];

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

	return filtered;
};
