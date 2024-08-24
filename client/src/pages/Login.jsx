import { useState } from "react";
import EmailWindow from "../ui/components/login-windows/EmailWindow";
import PasswordWindow from "../ui/components/login-windows/PasswordWindow";
import ForgotPasswordWindow from "../ui/components/login-windows/ForgotPasswordWindow";
import SignUpWindow from "../ui/components/login-windows/SignUpWindow";
import { useNavigate } from "react-router-dom";

function Login() {
	const [activePanel, setActivePanel] = useState("email");
	const navigate = useNavigate();

	const user = false;

	const handleEmailSubmit = () => {
		if (user) {
			setActivePanel("password");
		} else {
			setActivePanel("signup");
		}
	};

	const handlePasswordSubmit = () => {
		navigate("/");
	};

	const handleForgotPassword = () => {
		setActivePanel("forgot");
	};

	return activePanel === "email" ? (
		<EmailWindow onClick={handleEmailSubmit} />
	) : activePanel === "password" ? (
		<PasswordWindow
			setActivePanel={setActivePanel}
			handleForgotPassword={handleForgotPassword}
			onClick={handlePasswordSubmit}
		/>
	) : activePanel === "signup" ? (
		<SignUpWindow />
	) : (
		<ForgotPasswordWindow />
	);
}

export default Login;
