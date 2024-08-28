import FormCell from "../ui/utils/FormCell";

function Account() {
	return (
		<>
			<p className="account__title">Update Info</p>
			<div className="line" />

			<div className="account__grid">
				<FormCell fieldname="firstName" label="First Name" />
				<FormCell fieldname="lastName" label="Last Name" />

				<FormCell type="email" fieldname="email" label="Email" />
				<FormCell type="tel" fieldname="phone" label="Phone Number" />

				<button className="account__grid-btn">Update</button>
			</div>

			<p className="account__title">Update Password</p>
			<div className="line" />

			<div className="account__grid">
				<FormCell fieldname="oldPassword" label="Current Password" />
				<FormCell fieldname="newPassword" label="New Password" />

				<button className="account__grid-btn">Update</button>
			</div>
		</>
	);
}

export default Account;
