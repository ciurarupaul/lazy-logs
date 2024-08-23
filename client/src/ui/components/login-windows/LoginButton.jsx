import { HiBars3, HiUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import ThemeButton from "../../utils/ThemeButton";

function LoginButton({ toggleTheme }) {
	return (
		<div className="header__user-box">
			<ThemeButton onClick={toggleTheme} />

			<Link to="/login" className="header__user-button">
				<HiBars3 className="header__user-menu" />{" "}
				<HiUserCircle className="header__user-account" />
			</Link>
		</div>
	);
}

export default LoginButton;
