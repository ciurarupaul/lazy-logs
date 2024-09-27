import { RiArrowGoBackFill } from "react-icons/ri";

function PageNotFound() {
	return (
		<div className="error-page page-container">
			<div>This page doesn't exist</div>

			<button onClick={() => (window.location.href = "/")}>
				Go back <RiArrowGoBackFill className="error-page-icon" />
			</button>
		</div>
	);
}

export default PageNotFound;
