import { createContext, useContext, useState, useEffect } from "react";
import {
	loginUser,
	logoutUser,
	isLoggedIn,
	getUserByEmail,
} from "../services/apiLogin";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		user: null,
		token: null,
	});

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await isLoggedIn();
				if (response && response.loggedIn) {
					setAuthState({
						isAuthenticated: true,
						user: response.user,
						token: response.token,
					});
				} else {
					setAuthState({
						isAuthenticated: false,
						user: null,
						token: null,
					});
				}
			} catch (err) {
				console.error("Error checking authentication status:", err);
				setAuthState({
					isAuthenticated: false,
					user: null,
					token: null,
				});
			}
		};

		checkAuthStatus();
	}, []);

	const login = async (email, password) => {
		try {
			const response = await loginUser(email, password);
			setAuthState({
				isAuthenticated: true,
				user: response.user,
				token: response.token,
			});
		} catch (err) {
			console.error("Error logging in:", err);
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
			});
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
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
		<AuthContext.Provider value={{ authState, login, logout, getUser }}>
			{children}
		</AuthContext.Provider>
	);
};

function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("AuthContext was used outside of AuthProvider!");
	return context;
}

export { AuthProvider, useAuthContext };
