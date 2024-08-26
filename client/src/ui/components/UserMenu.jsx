import { HiBars3, HiUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Menus from "../utils/Menus";
import ThemeButton from "../utils/ThemeButton";
import { useAuthContext } from "../../context/authContext";
import { useEffect, useState } from "react";

function UserMenu({ toggleTheme }) {
	const { logout } = useAuthContext();

	// add success toast
	const handleLogout = async () => {
		try {
			await logout();
		} catch (err) {
			console.error("Error logging out:", err);
		}
	};

	return (
		<Menus>
			<Menus.Menu>
				<div className="header__user-box">
					<ThemeButton onClick={toggleTheme} />
					<Menus.Toggle id="options">
						<button className="header__user-button">
							<HiBars3 className="header__user-menu" />{" "}
							<HiUserCircle className="header__user-account" />
						</button>
					</Menus.Toggle>
				</div>

				<Menus.List id="options">
					<div className="user-menu">
						<div className="small-margin" />

						<div className="border-bottom">
							<Link to="/users/1asfd3282jkdf" className="link">
								<Menus.Button>Account</Menus.Button>
							</Link>
							<Link
								to="/users/1asfd3282jkdf/bookings"
								className="link"
							>
								<Menus.Button>Bookings</Menus.Button>
							</Link>
							<Link
								to="/users/1asfd3282jkdf/wishlist"
								className="link"
							>
								<Menus.Button>Wishlist</Menus.Button>
							</Link>
						</div>

						<div className="border-bottom">
							<Menus.Button>Language</Menus.Button>
							<Menus.Button>Currency</Menus.Button>
						</div>

						<div>
							<Menus.Button>Contact Us</Menus.Button>
							<Menus.Button onClick={handleLogout}>
								Log out
							</Menus.Button>
						</div>

						<div className="small-margin" />
					</div>
				</Menus.List>
			</Menus.Menu>
		</Menus>
	);
}

export default UserMenu;
