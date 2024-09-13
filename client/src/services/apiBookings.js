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
