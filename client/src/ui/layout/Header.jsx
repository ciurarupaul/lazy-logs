import { useEffect, useState } from "react";
import { GiCampfire } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import UserMenu from "../components/UserMenu";
import LoginButton from "../components/login/LoginButton";

function Header() {
	// theme logic
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "dark-theme"
	);

	useEffect(() => {
		document.documentElement.className = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === "dark-theme" ? "light-theme" : "dark-theme"
		);
	};

	// use auth context to check if there is a logged in user
	const { authState } = useAuthContext();

	return (
		<header className="header">
			<div className="header__logo-box">
				<Link to="/">
					<GiCampfire className="header__logo-icon" />
				</Link>
				<p className="header__logo-text">lazy-logs</p>
			</div>

			{authState.isAuthenticated ? (
				<UserMenu toggleTheme={toggleTheme} />
			) : (
				<LoginButton toggleTheme={toggleTheme} />
			)}
		</header>
	);
}

export default Header;
