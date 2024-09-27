import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { WishlistProvider } from "./context/wishlistContext";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import ErrorPage from "./pages/ErrorPage";
import Listing from "./pages/Listing";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Wishlist from "./pages/Wishlist";
import AccountLayout from "./ui/layout/AccountLayout";
import AppLayout from "./ui/layout/AppLayout";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<WishlistProvider>
					<AppRoutes />
				</WishlistProvider>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

function AppRoutes() {
	return (
		<ErrorBoundary fallback={<ErrorPage />}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						errorElement={<ErrorPage />}
						element={<AppLayout />}
					>
						<Route index element={<Listings />} />
						<Route path="/listings" element={<Listings />} />
						<Route
							path="/listings/:listingId"
							element={<Listing />}
						/>
						<Route path="users/:userId" element={<AccountLayout />}>
							<Route index element={<Account />} />
							<Route path="bookings" element={<Bookings />} />
							<Route path="wishlist" element={<Wishlist />} />
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
			<Toaster
				position="top-center"
				gutter={8}
				containerClassName="toaster"
				toastOptions={{
					success: {
						duration: 5000,
					},
					error: {
						duration: 5000,
					},
				}}
			/>
		</ErrorBoundary>
	);
}

export default App;
