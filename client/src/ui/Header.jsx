import { GiCampfire } from "react-icons/gi";
import { HiBars3, HiUserCircle } from "react-icons/hi2";
import Menus from "../ui/Menus";
import ThemeButton from "./ThemeButton";
import { useEffect, useState } from "react";

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

	return (
		<header className="header container">
			<div className="header__logo-box">
				<GiCampfire className="header__logo-icon" />
				<p className="header__logo-text">lazy-logs</p>
			</div>

			<Menus>
				<Menus.Menu>
					<div className="header__user-box">
						<ThemeButton onClick={toggleTheme} />
						<Menus.Toggle id="main-menu">
							<button className="header__user-button">
								<HiBars3 className="header__user-menu" />{" "}
								<HiUserCircle className="header__user-account" />
							</button>
						</Menus.Toggle>
					</div>
					<Menus.List id="main-menu">
						<div className="small-margin" />

						<Menus.Button>Account</Menus.Button>
						<Menus.Button>Bookings</Menus.Button>
						<Menus.Button>Wishlist</Menus.Button>

						<div className="line" />

						<Menus.Button>Language</Menus.Button>
						<Menus.Button>Currency</Menus.Button>

						<div className="line" />

						<Menus.Button>Contact Us</Menus.Button>
						<Menus.Button>Log out</Menus.Button>

						<div className="small-margin" />
					</Menus.List>
				</Menus.Menu>
			</Menus>
		</header>
	);
}

export default Header;
