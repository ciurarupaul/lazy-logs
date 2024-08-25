import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getListings() {
	try {
		const response = await apiClient.get("/listings");
		return response.data; // axios automatically parses the JSON response
	} catch (error) {
		console.error("Error fetching listings:", error);
		throw error; // Rethrow the error so it can be handled in the component
	}
}
