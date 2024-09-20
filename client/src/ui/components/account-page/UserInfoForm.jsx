import FormCell from "../../utils/FormCell";

function UserInfoForm({ state, handleChange, handleUpdateInfo }) {
	return (
		<>
			<p className="account__title">Update Info</p>
			<div className="line" />
			<div className="account__grid">
				<FormCell
					fieldname="firstName"
					label="First Name"
					value={state.firstName}
					onChange={handleChange}
				/>
				<FormCell
					fieldname="lastName"
					label="Last Name"
					value={state.lastName}
					onChange={handleChange}
				/>
				<FormCell
					type="email"
					fieldname="email"
					label="Email"
					value={state.email}
					onChange={handleChange}
				/>
				<FormCell
					type="tel"
					fieldname="phone"
					label="Phone Number"
					value={state.phone}
					onChange={handleChange}
				/>
				<button
					className="account__grid-btn"
					onClick={handleUpdateInfo}
				>
					Update
				</button>
			</div>
		</>
	);
}

export default UserInfoForm;
