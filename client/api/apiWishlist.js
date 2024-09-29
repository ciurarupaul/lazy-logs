import apiClient from "./apiClient.js";

export async function getWishlist() {
	const response = await apiClient.get("/wishlist");
	return response.data.data.wishlist;
}

export async function addToWishlist(listingId) {
	const response = await apiClient.post("/wishlist", { listingId });
	return response.data.data.wishlist;
}

export async function removeFromWishlist(listingId) {
	const response = await apiClient.delete(`/wishlist/${listingId}`);
	return response.data.data.wishlist;
}
