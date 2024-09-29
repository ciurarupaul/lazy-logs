import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import {
	isLoggedIn,
	loginUser,
	logoutUser,
	signUpUser,
} from "../../api/apiAuth";
import { getUserByEmail } from "../../api/apiUsers";
import handleError from "../utils/handleError";
import { OnlyLoaderOnPage as Loader } from "../ui/utils/Loader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isAuthenticated: false,
		user: null,
		token: null,
		loading: true,
	});

	const queryClient = useQueryClient();

	const { data: authData, error: authError } = useQuery({
		queryKey: ["authStatus"],
		queryFn: isLoggedIn,
	});

	useEffect(() => {
		if (authData) {
			setAuthState({
				isAuthenticated: authData.loggedIn,
				user: authData.loggedIn ? authData.user : null,
				token: authData.loggedIn ? authData.token : null,
				loading: false,
			});
		} else if (authError) {
			handleError(authError, "Error checking authentication status");
			setAuthState({
				isAuthenticated: false,
				user: null,
				token: null,
				loading: false,
			});
		}
	}, [authData, authError]);

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

	const login = async (email, password) => {
		await loginMutation.mutateAsync({ email, password });
	};

	const signup = async (userData) => {
		await signupMutation.mutateAsync(userData);
	};

	const logout = async () => {
		await logoutMutation.mutateAsync();
	};

	// Here and not in apiUsers because is needed for the auth process
	// Get user query
	const getUserQuery = (email) => {
		return useQuery({
			queryKey: ["user", email],
			queryFn: async () => {
				const response = await getUserByEmail(email);
				queryClient.invalidateQueries("user"); //maybe debounce later ???
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
				login,
				signup,
				logout,
				getUserQuery,
			}}
		>
			{authState.loading ? <Loader>your data</Loader> : children}
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
