import axios from "axios";

axios.defaults.withCredentials = true; // send cookies with every request

const apiClient = axios.create({
	baseURL: "http://localhost:3000/api/users",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getUserByEmail(email) {
	try {
		const response = await apiClient.get("/me", {
			params: { email },
		});
		return response.data;
	} catch (error) {
		console.error("Error trying to find if user exists:", error);
		throw error;
	}
}

export async function updateMyPassword(currentPassword, newPassword) {
	try {
		const result = await apiClient.patch("/updateMyPassword", {
			currentPassword,
			newPassword,
		});
		return result;
	} catch (error) {
		console.error("Error updating password:", error);
		throw error;
	}
}

export async function updateUser(id, data) {
	try {
		const result = await apiClient.patch(`/${id}`, data);
		return result;
	} catch (error) {
		console.error("Error updating user data:", error);
		throw error;
	}
}

export async function getUserById(id) {
	try {
		const result = await apiClient.get("me", { id });
		return result;
	} catch (error) {
		console.error("Error getting user data:", error);
		throw error;
	}
}
