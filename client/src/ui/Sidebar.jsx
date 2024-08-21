import { NavLink } from "react-router-dom";

function Sidebar() {
	return (
		<aside className="sidebar">
			<div className="sidebar__user">
				<img
					src="/users/default-user.jpg"
					alt="user pfp"
					className="sidebar__user-photo"
				/>
				<p className="sidebar__user-text">
					Hi, <span>Maria-Luisa-Alexandra</span>
				</p>
			</div>
			<div className="sidebar__buttons">
				<NavLink
					to="/users/1asfd3282jkdf"
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
					to="/users/1asfd3282jkdf/bookings"
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
					to="/users/1asfd3282jkdf/wishlist"
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
				<NavLink
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
				</NavLink>
			</div>
		</aside>
	);
}

export default Sidebar;
