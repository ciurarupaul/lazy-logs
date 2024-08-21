import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import ErrorPage from "./pages/ErrorPage";
import Listing from "./pages/Listing";
import Listings from "./pages/Listings";
import PageNotFound from "./pages/PageNotFound";
import YourListings from "./pages/YourListings";
import AccountLayout from "./ui/AccountLayout";
import AppLayout from "./ui/AppLayout";
import Wishlist from "./pages/Wishlist";

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

						<Route path="users/:userId" element={<AccountLayout />}>
							<Route index element={<Account />} />
							<Route path="bookings">
								<Route index element={<Bookings />} />
								<Route
									path=":bookingId"
									element={<Booking />}
								/>
							</Route>
							<Route path="wishlist" element={<Wishlist />} />
							<Route
								path="your-listings"
								element={<YourListings />}
							/>
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
