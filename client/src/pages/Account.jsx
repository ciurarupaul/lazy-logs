import { useQuery } from "@tanstack/react-query";
import { useReducer, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { handleUpdateInfo, handleUpdatePassword } from "../hooks/useAccount";
import { getUserById } from "../services/apiUsers";
import NewPasswordForm from "../ui/components/account-page/NewPasswordForm";
import UserInfoForm from "../ui/components/account-page/UserInfoForm";
import { Loader } from "../ui/utils/Loader";
import handleError from "../utils/handleError";

// Initial state for the form reducer
const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	currentPassword: "",
	newPassword: "",
};

// Reducer function for form state management
function formReducer(state, action) {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "SET_USER_DATA":
			return {
				...state,
				firstName: action.userData.firstName || "",
				lastName: action.userData.lastName || "",
				email: action.userData.email || "",
				phone: action.userData.phone || "",
			};
		default:
			return state;
	}
}

function Account() {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { authState } = useAuthContext();

	const userId = useMemo(() => authState.user?._id, [authState.user?._id]);

	const { isLoading } = useQuery(
		["userData", userId],
		() => getUserById(userId),
		{
			enabled: !!userId,
			onSuccess: (data) => {
				dispatch({ type: "SET_USER_DATA", userData: data });
			},
			onError: (err) => {
				handleError(err, "Failed to fetch your data");
			},
		}
	);

	const handleChange = useCallback((e) => {
		dispatch({
			type: "SET_FIELD",
			field: e.target.name,
			value: e.target.value,
		});
	}, []);

	/* 
	useMemo: Memorizes (caches) the result of a function (or computation) and reuses it when its dependencies haven't changed.
	
	useCallback: Memorizes (caches) the function itself and ensures the function is not recreated unless its dependencies change.
	*/

	const debouncedUpdateInfo = useCallback(() => {
		handleUpdateInfo(state, authState.user._id);
	}, [state, authState.user._id]);

	const debouncedUpdatePassword = useCallback(() => {
		handleUpdatePassword(state.currentPassword, state.newPassword);
	}, [state.currentPassword, state.newPassword]);

	if (isLoading || !authState.isAuthenticated || !userId) {
		return <Loader>Your account data is being loaded...</Loader>;
	}

	return (
		<>
			<UserInfoForm
				state={state}
				handleChange={handleChange}
				handleUpdateInfo={debouncedUpdateInfo}
			/>
			<NewPasswordForm
				state={state}
				handleChange={handleChange}
				handleUpdatePassword={debouncedUpdatePassword}
			/>
		</>
	);
}

export default Account;
