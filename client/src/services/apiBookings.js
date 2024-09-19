import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:3000/api/bookings",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getBookingsForUser(id) {
	try {
		const response = await apiClient.get(`/user/${id}`);
		return response.data.data.bookings;
	} catch (error) {
		console.error("Error fetching bookings:", error);
		throw error;
	}
}

export async function createBooking(bookingData) {
	try {
		await apiClient.post("/", bookingData);
	} catch (error) {
		console.error("Error creating booking:", error);
		throw error;
	}
}

export async function cancelBooking(id) {
	try {
		await apiClient.delete(`/${id}`);
	} catch (error) {
		console.error("Error creating booking:", error);
		throw error;
	}
}
