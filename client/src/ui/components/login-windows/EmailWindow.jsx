import { Link } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";

function EmailPanel({ onClick }) {
	return (
		<div className="login">
			<div className="login__logo">
				<Link to="/">
					<GiCampfire className="login__logo-icon" />
				</Link>
				<p className="login__logo-text">lazy-logs</p>
			</div>

			<div className="form login__form">
				<form
					action="#"
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						required
					/>
					<label htmlFor="email">Email</label>
				</form>
			</div>

			<button className="login__buttons-btn" onClick={onClick}>
				Next
			</button>

			<p className="login__email-text">
				Don't have an account? Don't worry! You'll be able to create one
				in the following step!
			</p>

			<div className="line" />

			<p className="login__email-text-or">log in with:</p>

			<p className="login__email-floating-or">or</p>

			<button className="login__buttons-btn">google auth</button>
		</div>
	);
}

export default EmailPanel;
