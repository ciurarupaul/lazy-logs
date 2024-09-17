import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:3000/api/listings",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getListings() {
	try {
		const response = await apiClient.get("/");
		return response.data;
	} catch (error) {
		console.error("Error fetching listings:", error);
		throw error;
	}
}

export async function getListing(id) {
	try {
		const response = await apiClient.get(`/${id}`);
		return response.data.data.data;
	} catch (error) {
		console.error("Error fetching listing details:", error);
		throw error;
	}
}
