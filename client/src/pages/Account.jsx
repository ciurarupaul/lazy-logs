import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useReducer } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { handleUpdateInfo, handleUpdatePassword } from "../hooks/useAccount";
import { deleteUser, getUserById } from "../../api/apiUsers";
import NewPasswordForm from "../ui/components/account-page/NewPasswordForm";
import UserInfoForm from "../ui/components/account-page/UserInfoForm";
import { PageLoader as Loader } from "../ui/utils/Loader";
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
			console.log(action.userData);
			return {
				...state,
				firstName: action.userData.name.split(" ")[0] || "",
				lastName: action.userData.name.split(" ")[1] || "",
				email: action.userData.email || "",
				phone: action.userData.phone || "",
			};
		default:
			return state;
	}
}

function Account() {
	const { authState } = useAuthContext();
	const navigate = useNavigate();

	const [state, dispatch] = useReducer(formReducer, {
		...initialState,
		firstName: authState.user?.name.split(" ")[0] || "",
		lastName: authState.user?.name.split(" ")[1] || "",
		email: authState.user?.email || "",
		phone: authState.user?.phoneNumber || "",
	});

	const userId = useMemo(() => authState.user?._id, [authState.user?._id]);

	const { isLoading } = useQuery({
		queryKey: ["userData", userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId && !authState.loading,
		onSuccess: (data) => {
			dispatch({ type: "SET_USER_DATA", userData: data });
		},
		onError: (err) => {
			handleError(err, "Failed to fetch your data");
		},
	});

	const handleChange = useCallback((e) => {
		dispatch({
			type: "SET_FIELD",
			field: e.target.name,
			value: e.target.value,
		});
	}, []);

	const handleDeleteAccount = () => {
		deleteUser(userId);
		navigate("/");
		toast.success("Account deleted!", {
			className: "toast toast-success",
		});
	};

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

	if (isLoading) {
		return <Loader>your account data</Loader>;
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
			<div className="delete-account">
				<button
					className="delete-account-btn"
					onClick={handleDeleteAccount}
				>
					Delete Account
				</button>
			</div>
		</>
	);
}

export default Account;
