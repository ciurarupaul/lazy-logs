import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import ErrorPage from "./pages/ErrorPage";
import Listing from "./pages/Listing";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Wishlist from "./pages/Wishlist";
import YourListings from "./pages/YourListings";
import AccountLayout from "./ui/layout/AccountLayout";
import AppLayout from "./ui/layout/AppLayout";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						errorElement={<ErrorPage />}
						element={<AppLayout />}
					>
						<Route path="/" errorElement={<ErrorPage />}>
							<Route index element={<Listings />} />

							<Route path="/listings" element={<Listings />} />
							<Route
								path="/listings/:listingId"
								element={<Listing />}
							/>

							<Route
								path="users/:userId"
								element={<AccountLayout />}
							>
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

					<Route
						path="/login"
						errorElement={<ErrorPage />}
						element={<Login />}
					/>

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
