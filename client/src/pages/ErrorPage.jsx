import { RiArrowGoBackFill } from "react-icons/ri";

function ErrorPage() {
	return (
		<div className="error-page">
			<div>Looks like something went wrong</div>

			<button onClick={() => (window.location.href = "/")}>
				Go back <RiArrowGoBackFill className="error-page-icon" />
			</button>
		</div>
	);
}

export default ErrorPage;
