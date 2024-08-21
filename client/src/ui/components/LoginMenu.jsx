import { HiBars3, HiUserCircle } from "react-icons/hi2";
import Menus from "../utils/Menus";
import ThemeButton from "../utils/ThemeButton";

function LoginMenu({ toggleTheme }) {
	return (
		<Menus>
			<Menus.Menu>
				<div className="header__user-box">
					<ThemeButton onClick={toggleTheme} />
					<Menus.Toggle id="login">
						<button className="header__user-button">
							<HiBars3 className="header__user-menu" />{" "}
							<HiUserCircle className="header__user-account" />
						</button>
					</Menus.Toggle>
				</div>

				<Menus.List id="login">
					<div>login</div>
				</Menus.List>
			</Menus.Menu>
		</Menus>
	);
}

export default LoginMenu;
