import { useRef, useState } from "react";
import { GiCampfire } from "react-icons/gi";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import FormCell from "../../utils/FormCell";
import { toast } from "react-hot-toast";

const SignUpWindow = ({ setActiveWindow, setEmail, onSubmitData }) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

	const nameRef = useRef(null);
	const phoneRef = useRef(null);
	const passwordRef = useRef(null);

	// Validation functions
	const validateName = (value) => {
		const namePattern = /^[a-zA-Z-\s]+$/;
		return (
			namePattern.test(value.trim()) &&
			value.trim().length >= 2 &&
			value.trim().length <= 50
		);
	};

	const validatePhone = (value) => {
		const phonePattern = /^\+?[0-9]{10,14}$/;
		return phonePattern.test(value.trim());
	};

	const validatePassword = (value) => {
		return value.trim().length > 0;
	};

	const handleSubmit = () => {
		if (
			validateName(name) &&
			validatePhone(phone) &&
			validatePassword(password)
		) {
			onSubmitData(name, phone, password);
		} else {
			toast.error("Please provide all requested information", {
				className: "toast toast-error toast-xsmall",
			});
		}
	};

	const handleGoBack = () => {
		setActiveWindow("email");
		setEmail("");
	};

	const handleKeyDown = (e, ref) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (ref && ref.current) {
				ref.current.focus();
			} else {
				handleSubmit();
			}
		}
	};

	return (
		<div className="login">
			<div className="login__logo">
				<Link to="/">
					<GiCampfire className="login__logo-icon" />
				</Link>
				<p className="login__logo-text">lazy-logs</p>
			</div>

			<p className="login__signup-greet">
				Looks like you don't have an account. <br /> Let's create one!
			</p>

			<div className="login__signup-form">
				<FormCell
					fieldname="name"
					label="First and Last Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onSubmit={handleSubmit}
					onKeyDown={(e) => handleKeyDown(e, phoneRef)}
					validation={validateName}
					autofocus={true}
					ref={nameRef}
					required
				/>

				<FormCell
					type="tel"
					fieldname="phone"
					label="Phone Number"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					onSubmit={handleSubmit}
					onKeyDown={(e) => handleKeyDown(e, passwordRef)}
					validation={validatePhone}
					ref={phoneRef}
					required
				/>

				<FormCell
					fieldname="password"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onSubmit={handleSubmit}
					onKeyDown={(e) => handleKeyDown(e, null)}
					validation={validatePassword}
					ref={passwordRef}
					required
				/>
			</div>

			<button onClick={handleGoBack} className="login__password-back">
				<HiOutlineChevronLeft className="login__password-back-icon" />
				Go back
			</button>

			<button className="login__buttons-btn" onClick={handleSubmit}>
				Continue
			</button>
		</div>
	);
};

export default SignUpWindow;
