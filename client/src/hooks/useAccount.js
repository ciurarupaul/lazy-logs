import toast from "react-hot-toast";
import { updateMyPassword, updateUser } from "../../api/apiUsers";

export const handleUpdatePassword = async (currentPassword, newPassword) => {
	await updateMyPassword(currentPassword, newPassword);
	toast.success("Password updated!", {
		className: "toast toast-success",
	});
};

export const handleUpdateInfo = async (state, userId) => {
	await updateUser(userId, {
		name: `${state.firstName} ${state.lastName}`,
		email: state.email,
		phoneNumber: state.phone,
	});
	toast.success("User info updated!", {
		className: "toast toast-success",
	});
};
