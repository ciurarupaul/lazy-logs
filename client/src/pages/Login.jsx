import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailWindow from "../ui/components/login-windows/EmailWindow";
import ForgotPasswordWindow from "../ui/components/login-windows/ForgotPasswordWindow";
import PasswordWindow from "../ui/components/login-windows/PasswordWindow";
import SignUpWindow from "../ui/components/login-windows/SignUpWindow";

function Login() {
	const [activeWindow, setActiveWindow] = useState("email");

	const navigate = useNavigate();

	const handleEmailSubmit = () => {
		if (user) {
			setActiveWindow("password");
		} else {
			setActiveWindow("signup");
		}
	};

	const handlePasswordSubmit = () => {
		navigate("/");
	};

	const handleForgotPassword = () => {
		setActiveWindow("forgot");
	};

	return activeWindow === "email" ? (
		<EmailWindow onClick={handleEmailSubmit} />
	) : activeWindow === "password" ? (
		<PasswordWindow
			setActiveWindow={setActiveWindow}
			handleForgotPassword={handleForgotPassword}
			onClick={handlePasswordSubmit}
		/>
	) : activeWindow === "signup" ? (
		<SignUpWindow />
	) : (
		<ForgotPasswordWindow />
	);
}

export default Login;
