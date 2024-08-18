import { GiCampfire } from "react-icons/gi";
import { HiBars3, HiUserCircle, HiOutlineGlobeAlt } from "react-icons/hi2";

function Header() {
	return (
		<header className="header container">
			<div className="header__logo-box">
				<GiCampfire className="header__logo-icon" />
				<p className="header__logo-text">lazy-logs</p>
			</div>

			<div className="header__user-box">
				<HiOutlineGlobeAlt className="header__user-options" />
				<button className="header__user-button">
					<HiBars3 className="header__user-menu" />{" "}
					<HiUserCircle className="header__user-account" />
				</button>
			</div>
		</header>
	);
}

export default Header;
