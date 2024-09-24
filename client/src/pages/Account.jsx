import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { handleUpdateInfo, handleUpdatePassword } from "../hooks/useAccount";
import { getUserById } from "../services/apiUsers";
import NewPasswordForm from "../ui/components/account-page/NewPasswordForm";
import UserInfoForm from "../ui/components/account-page/UserInfoForm";
import { Loader } from "../ui/utils/Loader";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	currentPassword: "",
	newPassword: "",
};

function formReducer(state, action) {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "SET_USER_DATA":
			return {
				...state,
				firstName: action.userData.name.split(" ")[0] || "",
				lastName: action.userData.name.split(" ")[1] || "",
				email: action.userData.email || "",
				phone: action.userData.phoneNumber || "",
			};
		default:
			return state;
	}
}

function Account() {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { authState } = useAuthContext();

	useQuery({
		queryKey: ["userData", authState.user._id],
		queryFn: () => getUserById(authState.user._id),
		enabled: !!authState.user._id,
		onSuccess: (data) => {
			dispatch({ type: "SET_USER_DATA", userData: data });
		},
		onError: (err) => {
			console.error(err.message);
			toast.error("Failed to fetch user data.", {
				className: "toast toast-error",
			});
		},
	});

	const handleChange = (e) => {
		dispatch({
			type: "SET_FIELD",
			field: e.target.name,
			value: e.target.value,
		});
	};

	if (isLoading || authState.loading) return <Loader>your data</Loader>;

	return (
		<>
			<UserInfoForm
				state={state}
				handleChange={handleChange}
				handleUpdateInfo={() =>
					handleUpdateInfo(state, authState.user._id)
				}
			/>
			<NewPasswordForm
				handleChange={handleChange}
				handleUpdatePassword={() =>
					handleUpdatePassword(
						state.currentPassword,
						state.newPassword
					)
				}
			/>
		</>
	);
}

export default Account;
