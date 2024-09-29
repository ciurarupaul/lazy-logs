import apiClient from "./apiClient.js";

// if more complex, should also include data validation here, especially if the requests are reused

export async function getUserByEmail(email) {
	const response = await apiClient.get("/users/me", {
		params: { email },
	});
	return response.data;
}

// for updates, return result in case the call needs to see if the request was successful

export async function updateMyPassword(currentPassword, newPassword) {
	const response = await apiClient.patch("/users/updateMyPassword", {
		currentPassword,
		newPassword,
	});
	return response.data;
}

export async function updateUser(id, data) {
	const response = await apiClient.patch(`/users/${id}`, data);
	return response.data;
}

export async function getUserById(id) {
	const result = await apiClient.get(`/users/${id}`);
	return result.data.data.document;
}

export async function deleteUser(id) {
	await apiClient.delete(`/users/${id}`);
}
