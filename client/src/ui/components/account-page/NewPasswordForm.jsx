import FormCell from "../../utils/FormCell";

function NewPasswordForm({ handleChange, handleUpdatePassword }) {
	return (
		<>
			<p className="account__title">Update Password</p>
			<div className="line" />
			<div className="account__grid">
				<FormCell
					fieldname="currentPassword"
					label="Current Password"
					onChange={handleChange}
				/>
				<FormCell
					fieldname="newPassword"
					label="New Password"
					onChange={handleChange}
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

export default NewPasswordForm;
