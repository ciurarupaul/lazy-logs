import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { updateMyPassword, updateUser } from "../services/apiUser";
import FormCell from "../ui/utils/FormCell";

function Account() {
	const [newPassword, setNewPassword] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const { authState } = useAuthContext();

	const handleUpdatePassword = async () => {
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

	const handleUpdateInfo = async () => {
		try {
			const userId = authState.user._id;
			await updateUser(userId, { firstName, lastName, email, phone });
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

	return (
		<>
			<p className="account__title">Update Info</p>
			<div className="line" />

			<div className="account__grid">
				<FormCell
					fieldname="firstName"
					label="First Name"
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<FormCell
					fieldname="lastName"
					label="Last Name"
					onChange={(e) => setLastName(e.target.value)}
				/>
				<FormCell
					type="email"
					fieldname="email"
					label="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<FormCell
					type="tel"
					fieldname="phone"
					label="Phone Number"
					onChange={(e) => setPhone(e.target.value)}
				/>

				<button
					className="account__grid-btn"
					onClick={handleUpdateInfo}
				>
					Update
				</button>
			</div>

			<p className="account__title">Update Password</p>
			<div className="line" />

			<div className="account__grid">
				<FormCell
					fieldname="oldPassword"
					label="Current Password"
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<FormCell
					fieldname="newPassword"
					label="New Password"
					onChange={(e) => setNewPassword(e.target.value)}
				/>

				<button
					className="account__grid-btn"
					onClick={handleUpdatePassword}
				>
					Update
				</button>
			</div>
		</>
	);
}

export default Account;
