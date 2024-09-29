import apiClient from "./apiClient";

export async function getListings(filters, sortOption, page, itemsPerPage) {
	const response = await apiClient.get("/listings", {
		params: {
			filters,
			sortOption,
			page,
			itemsPerPage,
		},
	});
	return response.data;
}

export async function getListing(id) {
	const response = await apiClient.get(`/listings/${id}`);
	return response.data.data.data;
}

// no try catch because the middleware inside apiClient file deals with err catching
