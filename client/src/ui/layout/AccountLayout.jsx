import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AccountLayout() {
	return (
		<div className="account-grid-container">
			<Sidebar />
			<div className="user-page">
				<Outlet />
			</div>
		</div>
	);
}

export default AccountLayout;
