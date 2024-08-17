import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ErrorPage from "./pages/ErrorPage";
import Listing from "./pages/Listing";
import Listings from "./pages/Listings";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					errorElement={<ErrorPage />}
					element={<AppLayout />}
				>
					<Route path="/" errorElement={<ErrorPage />}>
						<Route index element={<Listings />} />

						<Route path="listings" element={<Listings />}>
							<Route path=":listingId" element={<Listing />} />
						</Route>

						<Route path="users/:userId" element={<Account />}>
							<Route path="bookings" element={<Bookings />}>
								<Route
									path=":bookingId"
									element={<Booking />}
								/>
							</Route>
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
