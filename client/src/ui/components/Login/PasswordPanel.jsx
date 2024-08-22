import { Link } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";
import { HiOutlineChevronLeft } from "react-icons/hi2";

function PasswordPanel({ setActivePanel }) {
	return (
		<div className="login">
			<div className="login__logo">
				<Link to="/">
					<GiCampfire className="login__logo-icon" />
				</Link>
				<p className="login__logo-text">lazy-logs</p>
			</div>

			<p className="login__password-greet">Welcome back, **username**</p>

			<div className="form login__form">
				<form
					action="#"
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						type="text"
						name="password"
						id="password"
						placeholder="Password"
						required
					/>
					<label htmlFor="password">Password</label>
				</form>
			</div>

			<button
				onClick={() => setActivePanel("email")}
				className="login__password-back"
			>
				<HiOutlineChevronLeft className="login__password-back-icon" />
				Go back
			</button>

			<button className="login__buttons-continue-pass">Continue</button>

			<div className="login__password-options">
				<div className="login__password-options-rememberme">
					<input type="checkbox" name="rememberMe" id="rememberMe" />
					<label htmlFor="rememberMe">Remember Me</label>
				</div>
				<button className="login__password-options-forgotpassword">
					Forgot password
				</button>
			</div>
		</div>
	);
}

export default PasswordPanel;
