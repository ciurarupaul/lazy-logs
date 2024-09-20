import toast from "react-hot-toast";
import { updateMyPassword, updateUser } from "../services/apiUsers";

export const handleUpdatePassword = async (currentPassword, newPassword) => {
	try {
		await updateMyPassword(currentPassword, newPassword);
		toast.success("Password updated!", {
			className: "toast toast-success",
		});
	} catch (err) {
		console.log(err.message);
		toast.error("Failed to update password. Please try again.", {
			className: "toast toast-error",
		});
	}
};

export const handleUpdateInfo = async (state, userId) => {
	try {
		await updateUser(userId, {
			name: `${state.firstName} ${state.lastName}`,
			email: state.email,
			phoneNumber: state.phone,
		});
		toast.success("User info updated!", {
			className: "toast toast-success",
		});
	} catch (err) {
		console.log(err.message);
		toast.error("Failed to update user info. Please try again.", {
			className: "toast toast-error",
		});
	}
};
