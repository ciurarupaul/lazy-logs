import { Link } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import FormCell from "../../utils/FormCell";
import { useState } from "react";

function PasswordPanel({
	setActiveWindow,
	handleForgotPassword,
	onSubmitPassword,
	setEmail,
	user,
}) {
	const [password, setPassword] = useState("");

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
			<div className="login__password-options">
				<div className="login__password-options-rememberme">
					<input type="checkbox" name="rememberMe" id="rememberMe" />
					<label htmlFor="rememberMe">Remember me</label>
				</div>
				<button
					className="login__password-options-forgotpassword"
					onClick={handleForgotPassword}
				>
					Forgot password
				</button>
			</div>
		</div>
	);
}

export default PasswordPanel;
