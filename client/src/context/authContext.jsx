import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import {
	isLoggedIn,
	loginUser,
	logoutUser,
	signUpUser,
} from "../services/apiAuth";
import { getUserByEmail } from "../services/apiUsers";
import handleError from "../utils/handleError";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		user: null,
		token: null,
		loading: false,
	});

	const queryClient = useQueryClient();

	// // Set loading state to true before the query is executed
	// useEffect(() => {
	// 	setAuthState((prevState) => ({
	// 		...prevState,
	// 		loading: true,
	// 	}));
	// }, []);

	// Query for authentication status
	const authQuery = useQuery({
		queryKey: ["authStatus"],
		queryFn: isLoggedIn,
		onSuccess: (response) => {
			setAuthState({
				isAuthenticated: response.loggedIn,
				user: response.loggedIn ? response.user : null,
				token: response.loggedIn ? response.token : null,
				loading: false,
			});
		},
		onError: (err) => {
			handleError(err, "Error checking authentication status");
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
				loading: false,
			});
		},
	});

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: ({ email, password }) => loginUser(email, password),
		onMutate: () => {
			setAuthState((prevState) => ({
				...prevState,
				loading: true,
			}));
		},
		onSuccess: (response) => {
			setAuthState({
				isAuthenticated: true,
				user: response.data.user,
				token: response.token,
				loading: false,
			});
			localStorage.setItem("authToken", response.token);
			queryClient.invalidateQueries("authStatus");
		},
		onError: (err) => {
			handleError(err, "Error logging in");
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
				loading: false,
			});
		},
	});

	// Signup mutation
	const signupMutation = useMutation({
		mutationFn: (userData) => signUpUser(userData),
		onMutate: () => {
			setAuthState((prevState) => ({
				...prevState,
				loading: true,
			}));
		},
		onSuccess: (response) => {
			setAuthState({
				isAuthenticated: true,
				user: response.data.user,
				token: response.token,
				loading: false,
			});
			localStorage.setItem("authToken", response.token);
			queryClient.invalidateQueries("authStatus");
		},
		onError: (err) => {
			handleError(err, "Error signing up");
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
				loading: false,
			});
		},
	});

	// Logout mutation
	const logoutMutation = useMutation({
		mutationFn: logoutUser,
		onMutate: () => {
			setAuthState((prevState) => ({
				...prevState,
				loading: true,
			}));
		},
		onSuccess: () => {
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
				loading: false,
			});
			localStorage.removeItem("authToken");
			queryClient.invalidateQueries("authStatus");
		},
		onError: (err) => {
			handleError(err, "Error logging out");
			setAuthState((prevState) => ({
				...prevState,
				loading: false,
			}));
		},
	});

	// Here and not in apiUsers because is needed for the auth process
	// Get user query
	const getUserQuery = (email) => {
		return useQuery({
			queryKey: ["user", email],
			queryFn: async () => {
				const response = await getUserByEmail(email);
				return response.data;
			},
			enabled: !!email, // Only run if an email is provided
			onError: (err) => {
				handleError(err, "Error getting user");
			},
		});
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				authQuery,
				loginMutation,
				signupMutation,
				logoutMutation,
				getUserQuery,
			}}
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
