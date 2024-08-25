import { useEffect, useState } from "react";
import { GiCampfire } from "react-icons/gi";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../services/apiLogin";
import UserMenu from "../components/UserMenu";
import LoginButton from "../components/login-windows/LoginButton";
import Loader from "../utils/Loader";

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

	// check if there is a logged in user
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkUserStatus = async () => {
			try {
				const response = await isLoggedIn();
				if (response && response.loggedIn) {
					setUser(response.user);
				} else {
					setUser(null);
				}
			} catch (err) {
				console.error("Error checking user status:", err);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		checkUserStatus();
	}, []);

	// if (isLoading) return <Loader />;

	return (
		<header className="header">
			<div className="header__logo-box">
				<Link to="/">
					<GiCampfire className="header__logo-icon" />
				</Link>
				<p className="header__logo-text">lazy-logs</p>
			</div>

			{user !== null ? (
				<UserMenu toggleTheme={toggleTheme} />
			) : (
				<LoginButton toggleTheme={toggleTheme} />
			)}
		</header>
	);
}

export default Header;
