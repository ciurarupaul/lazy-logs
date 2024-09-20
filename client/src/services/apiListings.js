import apiClient from "../utils/apiClient";

export async function getListings() {
	const response = await apiClient.get("/listings");
	return response.data;
}

export async function getListing(id) {
	const response = await apiClient.get(`/listings/${id}`);
	return response.data.data.data;
}

// no try catch because the middleware inside apiClient file deals with err catching
