import axios from "axios";
import { toast } from "react-hot-toast";

const apiClient = axios.create({
	baseURL:
		"https://lazy-logs-server.vercel.app/api" ||
		"http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // send cookies with every request
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		let message = "Something went wrong.";

		// Check for network error
		if (!error.response) {
			message = "Network error. Please check your connection.";
		} else {
			const { status, data } = error.response;
			switch (status) {
				case 400:
					// Bad request (validation, etc.)
					message = data?.message || "Invalid request data.";
					break;
				case 401:
					// Unauthorized (JWT expired, etc.)
					message = "Session expired. Please log in again.";
					// window.location.href = "/login";
					break;
				case 403:
					// Forbidden (insufficient permissions)
					message = "You are not authorized to perform this action.";
					break;
				case 404:
					// Resource not found
					message = "Requested resource not found.";
					break;
				case 500:
					// Server error
					message = "Server error. Please try again later.";
					break;
				default:
					message = data?.message || "Unexpected error occurred.";
			}
		}

		toast.error(message, {
			className: "toast toast-error",
		});

		// Reject promise to propagate the error to catch blocks
		return Promise.reject(error);
	}
);

export default apiClient;
