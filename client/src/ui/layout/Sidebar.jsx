import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

function Sidebar() {
	const { authState } = useAuthContext();

	return (
		<aside className="sidebar">
			<div className="sidebar__user">
				<img
					src={authState.user.photo}
					alt="user pfp"
					className="sidebar__user-photo"
				/>
				<p className="sidebar__user-text">
					Welcome back,{" "}
					<span>{authState.user.name.split(" ")[0]}</span>
				</p>
			</div>
			<div className="sidebar__buttons">
				<NavLink
					to={`/users/${authState.user._id}`}
					end // only active if it matches the full path
					className={({ isActive }) =>
						`${
							isActive
								? "sidebar__buttons-link sidebar__buttons-link--active"
								: "sidebar__buttons-link"
						}`
					}
				>
					Account
				</NavLink>
				<NavLink
					to={`/users/${authState.user._id}/bookings`}
					end
					className={({ isActive }) =>
						`${
							isActive
								? "sidebar__buttons-link sidebar__buttons-link--active"
								: "sidebar__buttons-link"
						}`
					}
				>
					Bookings
				</NavLink>
				<NavLink
					to={`/users/${authState.user._id}/wishlist`}
					end
					className={({ isActive }) =>
						`${
							isActive
								? "sidebar__buttons-link sidebar__buttons-link--active"
								: "sidebar__buttons-link"
						}`
					}
				>
					Wishlist
				</NavLink>
				{/* <NavLink
					to="/users/1asfd3282jkdf/your-listings"
					end
					className={({ isActive }) =>
						`${
							isActive
								? "sidebar__buttons-link sidebar__buttons-link--active"
								: "sidebar__buttons-link"
						}`
					}
				>
					Your listings
				</NavLink> */}
			</div>
		</aside>
	);
}

export default Sidebar;
