import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import EmailWindow from "../ui/components/login/EmailWindow";
import ForgotPasswordWindow from "../ui/components/login/ForgotPasswordWindow";
import PasswordWindow from "../ui/components/login/PasswordWindow";
import SignUpWindow from "../ui/components/login/SignUpWindow";
import { toast } from "react-hot-toast";
import handleError from "../utils/handleError";

function Login() {
	const [activeWindow, setActiveWindow] = useState("email");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { login, getUserQuery, signup } = useAuthContext();

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

	const { data: user, isLoading } = getUserQuery(email);

	useEffect(() => {
		if (email.trim() !== "" && user) {
			if (user.userExists && !isLoading) {
				setActiveWindow("password");
			} else {
				setActiveWindow("signup");
			}
		}
	}, [email, user]);

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
					handleError(err, "Error logging user in");
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
			user={user.document}
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
