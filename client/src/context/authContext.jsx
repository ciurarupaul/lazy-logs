import { createContext, useContext, useState, useEffect } from "react";
import {
	loginUser,
	logoutUser,
	isLoggedIn,
	getUserByEmail,
	signUpUser,
} from "../services/apiLogin";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		user: null,
		token: null,
		loading: true,
		// add this so nothing is rendered until this context is ready
	});

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await isLoggedIn();

				if (response.loggedIn) {
					setAuthState({
						isAuthenticated: true,
						user: response.user,
						loading: false,
					});
				} else {
					setAuthState({
						isAuthenticated: false,
						user: null,
						loading: false,
					});
				}
			} catch (err) {
				console.error("Error checking authentication status:", err);
				setAuthState({
					isAuthenticated: false,
					user: null,
					loading: false,
				});
			}
		};

		checkAuthStatus();
	}, []); //only run on mount

	const login = async (email, password) => {
		try {
			const response = await loginUser(email, password);
			setAuthState({
				isAuthenticated: true,
				user: response.data.user,
				token: response.token,
				loading: false,
			});
		} catch (err) {
			console.error("Error logging in:", err);
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
				loading: false,
			});
		}
	};

	const signup = async (userData) => {
		try {
			const response = await signUpUser(userData);
			setAuthState({
				isAuthenticated: true,
				user: response.data.user,
				token: response.token,
				loading: false,
			});
		} catch (err) {
			console.error("Error logging in:", err);
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
				loading: false,
			});
		}
	};

	const logout = async () => {
		console.log("Logging out...");
		try {
			await logoutUser();
			setAuthState({
				isAuthenticated: false,
				user: null,
				loading: false,
			});
		} catch (err) {
			console.error("Error logging out:", err);
		}
	};

	const getUser = async (email) => {
		try {
			const response = await getUserByEmail(email);
			return response.data;
		} catch (err) {
			console.error("Error fetching user by email:", err);
			return null;
		}
	};

	return (
		<AuthContext.Provider
			value={{ authState, login, signup, logout, getUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("useAuthContext must be used within an AuthProvider!");
	return context;
}

export { AuthProvider, useAuthContext };
