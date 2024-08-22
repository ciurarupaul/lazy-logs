import { useEffect, useState } from "react";
import { GiCampfire } from "react-icons/gi";
import { Link } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import LoginButton from "../components/Login/LoginButton";

function Header() {
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

	const user = false;

	return (
		<header className="header">
			<div className="header__logo-box">
				<Link to="/">
					<GiCampfire className="header__logo-icon" />
				</Link>
				<p className="header__logo-text">lazy-logs</p>
			</div>

			{user === true ? (
				<UserMenu toggleTheme={toggleTheme} />
			) : (
				<LoginButton toggleTheme={toggleTheme} />
			)}
		</header>
	);
}

export default Header;
