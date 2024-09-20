import apiClient from "../utils/apiClient";

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
