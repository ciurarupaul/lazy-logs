import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import EmailWindow from "../ui/components/login-windows/EmailWindow";
import ForgotPasswordWindow from "../ui/components/login-windows/ForgotPasswordWindow";
import PasswordWindow from "../ui/components/login-windows/PasswordWindow";
import SignUpWindow from "../ui/components/login-windows/SignUpWindow";

function Login() {
	const [activeWindow, setActiveWindow] = useState("email");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const { login, getUser } = useAuthContext();

	const handleEmailSubmit = (submittedEmail) => {
		setEmail(submittedEmail);
	};

	const handlePasswordSubmit = (submittedPassword) => {
		setPassword(submittedPassword);
	};

	useEffect(() => {
		const checkIfUserExists = async () => {
			if (email.trim() !== "") {
				try {
					const result = await getUser(email);
					setUser(result.document);

					if (result.userExists) {
						setActiveWindow("password");
					} else {
						setActiveWindow("signup");
					}
				} catch (err) {
					console.error("Error checking user status:", err);
				}
			}
		};

		checkIfUserExists();
	}, [email, getUser]);

	useEffect(() => {
		const checkUserCredentials = async () => {
			if (password.trim() !== "") {
				try {
					await login(email, password);
					navigate("/");
				} catch (err) {
					console.error("Error logging user in:", err);
				}
			}
		};

		checkUserCredentials();
	}, [password, email, login, navigate]);

	const handleForgotPassword = () => {
		setActiveWindow("forgot");
	};

	return activeWindow === "email" ? (
		<EmailWindow onSubmitEmail={handleEmailSubmit} />
	) : activeWindow === "password" ? (
		<PasswordWindow
			setActiveWindow={setActiveWindow}
			handleForgotPassword={handleForgotPassword}
			onSubmitPassword={handlePasswordSubmit}
			setEmail={setEmail}
			user={user}
		/>
	) : activeWindow === "signup" ? (
		<SignUpWindow />
	) : (
		<ForgotPasswordWindow />
	);
}

export default Login;
