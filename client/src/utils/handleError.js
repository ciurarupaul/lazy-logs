import toast from "react-hot-toast";

const handleError = (err, message) => {
	console.error(message, err);
	toast.error(message, {
		className: "toast toast-error",
	});
};

export default handleError;
