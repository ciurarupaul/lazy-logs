import { useState } from "react";
import EmailPanel from "../ui/components/Login/EmailPanel";
import PasswordPanel from "../ui/components/Login/PasswordPanel";
import SignUpPanel from "../ui/components/Login/SignUpPanel";

function Login() {
	const [activePanel, setActivePanel] = useState("email");

	const user = false;

	const handleSubmit = () => {
		console.log("button has been clicked");
		if (user) {
			setActivePanel("password");
		} else {
			setActivePanel("signup");
		}
	};

	return activePanel === "email" ? (
		<EmailPanel onClick={handleSubmit} />
	) : activePanel === "password" ? (
		<PasswordPanel />
	) : (
		<SignUpPanel />
	);
}

export default Login;
