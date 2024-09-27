import { Link } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import FormCell from "../../utils/FormCell";
import { useRef, useState } from "react";

function PasswordPanel({
	setActiveWindow,
	handleForgotPassword,
	onSubmitPassword,
	setEmail,
	user,
}) {
	const [password, setPassword] = useState("");
	const passwordRef = useRef(null);

	const validatePassword = (value) => {
		return value.trim().length > 0;
	};

	const handleGoBack = () => {
		setActiveWindow("email");
		setEmail("");
	};

	const handleInputChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="login">
			<div className="login__logo">
				<Link to="/">
					<GiCampfire className="login__logo-icon" />
				</Link>
				<p className="login__logo-text">lazy-logs</p>
			</div>
			<p className="login__password-greet">
				Welcome back, {user.name.split(" ")[0]}
			</p>

			<FormCell
				fieldname="password"
				label="Password"
				onChange={handleInputChange}
				onSubmit={onSubmitPassword}
				autofocus={true}
				ref={passwordRef}
				validation={validatePassword}
				required
			/>

			<button onClick={handleGoBack} className="login__password-back">
				<HiOutlineChevronLeft className="login__password-back-icon" />
				Go back
			</button>
			{/* HANDLE REMEMBER BE LOGIC WHEN SUBMITTING */}
			<button
				className="login__buttons-btn"
				onSubmit={() => {
					onSubmitPassword(password);
				}}
			>
				Continue
			</button>
		</div>
	);
}

export default PasswordPanel;
