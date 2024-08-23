import { Link, useNavigate } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";
import { GiCheckMark } from "react-icons/gi";

function ForgotPasswordWindow() {
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/");
	};

	return (
		<div className="login">
			<div className="login__logo">
				<Link to="/">
					<GiCampfire className="login__logo-icon" />
				</Link>
				<p className="login__logo-text">lazy-logs</p>
			</div>

			<p className="login__password-greet">Welcome back, **username**</p>

			<GiCheckMark className="login__forgot-icon" />

			<p className="login__forgot-text">
				We sent you an email with a reset password link. Please follow
				the instructions in the email!
			</p>

			<button className="login__buttons-btn" onClick={onClick}>
				Go to the homepage
			</button>
		</div>
	);
}

export default ForgotPasswordWindow;
