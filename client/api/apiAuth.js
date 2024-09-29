import axios from "axios";

axios.defaults.withCredentials = true; // send cookies with every request

const apiClient = axios.create({
	baseURL:
		"https://lazy-logs-server.vercel.app/api" ||
		"http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function isLoggedIn() {
	const response = await apiClient.get("/isLoggedIn", {
		withCredentials: true,
	});
	return response.data;
}

export async function signUpUser(userData) {
	const response = await apiClient.post("/signup", userData);
	return response.data;
}

export async function loginUser(email, password) {
	const response = await apiClient.post("/login", {
		email,
		password,
	});
	return response.data;
}

export async function logoutUser() {
	await apiClient.get("/logout");
}
