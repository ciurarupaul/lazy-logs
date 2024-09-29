import apiClient from "./apiClient";

export async function getBookingsForUser(id) {
	const response = await apiClient.get(`/bookings/user/${id}`);
	return response.data.data.bookings;
}

export async function createBooking(bookingData) {
	await apiClient.post("/bookings", bookingData);
}

export async function cancelBooking(id) {
	await apiClient.delete(`/bookings/${id}`);
}

// the controllers return an success with null for data - will keep requests like this but continue to return the empty success for controllers in case of anything or for consistency
