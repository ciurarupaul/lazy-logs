import axios from "axios";

axios.defaults.withCredentials = true; // send cookies with every request

const apiClient = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
			? "http://localhost:3000/api"
			: import.meta.env.VITE_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // send cookies with every request
});

export async function isLoggedIn() {
	const response = await apiClient.get("/users/isLoggedIn", {
		withCredentials: true,
	});
	return response.data;
}

export async function signUpUser(userData) {
	const response = await apiClient.post("/users/signup", userData);
	return response.data;
}

export async function loginUser(email, password) {
	const response = await apiClient.post("/users/login", {
		email,
		password,
	});
	return response.data;
}

export async function logoutUser() {
	await apiClient.get("/users/logout");
}
