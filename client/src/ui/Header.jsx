import { GiCampfire } from "react-icons/gi";
import { HiBars3 } from "react-icons/hi2";
import { HiUserCircle } from "react-icons/hi2";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

function Header() {
	return (
		<div className="header">
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
		</div>
	);
}

export default Header;
