import { toast } from "react-hot-toast";
import { HiBars3, HiUserCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import Menus from "../utils/Menus";
import ThemeButton from "../utils/ThemeButton";
import handleError from "../../utils/handleError";

function UserMenu({ toggleTheme }) {
	const { logout, authState } = useAuthContext();
	const navigate = useNavigate();

	// add success toast
	const handleLogout = async () => {
		try {
			toast.success("Successfully logged out!", {
				className: "toast toast-success",
			});
			await logout();
			navigate("/");
		} catch (err) {
			handleError(err, "Error logging out");
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
							<Link
								to={`users/${authState.user._id}`}
								className="link"
							>
								<Menus.Button>Account</Menus.Button>
							</Link>
							<Link
								to={`users/${authState.user._id}/bookings`}
								className="link"
							>
								<Menus.Button>Bookings</Menus.Button>
							</Link>
							<Link
								to={`users/${authState.user._id}/wishlist`}
								className="link"
							>
								<Menus.Button>Wishlist</Menus.Button>
							</Link>
						</div>

						<div>
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
