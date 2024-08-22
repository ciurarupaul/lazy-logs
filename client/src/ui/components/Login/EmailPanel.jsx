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

			<button className="login__buttons-next" onClick={onClick}>
				Next
			</button>

			<p className="login-text">
				Don't have an account? Don't worry! You'll be able to create one
				in the following step!
			</p>

			<div className="line login-line" />

			<p className="login-text-or">log in with:</p>

			<p className="floating-or">or</p>

			<button className="login__buttons-google">google auth</button>
		</div>
	);
}

export default EmailPanel;
