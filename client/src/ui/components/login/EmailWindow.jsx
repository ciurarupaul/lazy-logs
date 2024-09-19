import { Link } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";
import FormCell from "../../utils/FormCell";
import { useRef, useState } from "react";

function EmailWindow({ onSubmitEmail }) {
	const [email, setEmail] = useState("");

	const emailRef = useRef(null);

	const validateEmail = (value) => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(value.trim());
	};

	const handleInputChange = (e) => {
		setEmail(e.target.value);
	};

	return (
		<div className="login">
			<div className="login__logo">
				<Link to="/">
					<GiCampfire className="login__logo-icon" />
				</Link>
				<p className="login__logo-text">lazy-logs</p>
			</div>

			<FormCell
				type="email"
				fieldname="email"
				label="Email"
				onChange={handleInputChange}
				onSubmit={onSubmitEmail}
				validation={validateEmail}
				autofocus={true}
				ref={emailRef}
				required
			/>

			<button
				className="login__buttons-btn"
				onClick={() => {
					onSubmitEmail(email);
				}}
			>
				Next
			</button>
			<p className="login__email-text">
				Don't have an account? Don't worry! You'll be able to create one
				in the following step!
			</p>
			{/* use later to implement (if) googleAuth */}
			{/* <div className="line" />
			<p className="login__email-text-or">log in with:</p>
			<p className="login__email-floating-or">or</p>
			<button className="login__buttons-btn">google auth</button> */}
		</div>
	);
}

export default EmailWindow;
