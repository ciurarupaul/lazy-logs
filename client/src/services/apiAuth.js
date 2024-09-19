import axios from "axios";

axios.defaults.withCredentials = true; // send cookies with every request

const apiClient = axios.create({
	baseURL: "http://localhost:3000/api/users",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function isLoggedIn() {
	try {
		const response = await apiClient.get("/isLoggedIn", {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error trying to find if the user is logged in:", error);
		throw error;
	}
}

export async function signUpUser(userData) {
	try {
		const response = await apiClient.post("/signup", userData);
		return response.data;
	} catch (error) {
		console.error("Error signing up:", error);
		throw error;
	}
}

export async function loginUser(email, password) {
	try {
		const response = await apiClient.post("/login", {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error("Error logging in:", error);
		throw error;
	}
}

export async function logoutUser() {
	try {
		await apiClient.get("/logout");
	} catch (error) {
		console.error("Error logging out:", error);
		throw error;
	}
}
