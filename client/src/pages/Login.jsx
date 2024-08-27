import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import EmailWindow from "../ui/components/login-windows/EmailWindow";
import ForgotPasswordWindow from "../ui/components/login-windows/ForgotPasswordWindow";
import PasswordWindow from "../ui/components/login-windows/PasswordWindow";
import SignUpWindow from "../ui/components/login-windows/SignUpWindow";
import { toast } from "react-hot-toast";

function Login() {
	const [activeWindow, setActiveWindow] = useState("email");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const { login, getUser, signup } = useAuthContext();

	const handleEmailSubmit = (submittedEmail) => {
		setEmail(submittedEmail);
	};

	const handlePasswordSubmit = (submittedPassword) => {
		setPassword(submittedPassword);
	};

	const handleUserDataSubmit = async (name, phone, password) => {
		const userData = {
			email,
			name,
			phone,
			password,
		};

		try {
			await signup(userData);
			toast.success("Successfully signed up!", {
				className: "toast toast-success",
			});
			navigate("/");
		} catch (error) {
			console.error("Error signing up:", error);
		}
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
					toast.success("Successfully logged in!", {
						className: "toast toast-success",
					});
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
		<SignUpWindow
			setActiveWindow={setActiveWindow}
			setEmail={setEmail}
			onSubmitData={handleUserDataSubmit}
		/>
	) : (
		<ForgotPasswordWindow />
	);
}

export default Login;
