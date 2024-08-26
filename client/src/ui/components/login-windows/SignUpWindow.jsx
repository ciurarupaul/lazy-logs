import { Link, useNavigate } from "react-router-dom";
import { GiCampfire } from "react-icons/gi";
import FormCell from "../../utils/FormCell";
import { HiOutlineChevronLeft } from "react-icons/hi2";

function SignUpPanel() {
	const navigate = useNavigate();

	// const handleGoBack = () => {
	// 	setActiveWindow("email");
	// };

	return (
		<div className="login">
			<div className="login__logo">
				<Link to="/">
					<GiCampfire className="login__logo-icon" />
				</Link>
				<p className="login__logo-text">lazy-logs</p>
			</div>

			<p className="login__signup-greet">
				Looks like you don't have an account. <br /> Let's create one!
			</p>

			<FormCell fieldname="name" label="Full name" required />

			<FormCell fieldname="password" label="Password" required />
			<FormCell
				fieldname="confirmpassword"
				label="Confirm Password"
				required
			/>

			<button
				/* onClick={handleGoBack} |*/ className="login__password-back"
			>
				<HiOutlineChevronLeft className="login__password-back-icon" />
				Go back
			</button>

			<button
				className="login__buttons-btn"
				onClick={() => {
					navigate("/");
				}}
			>
				Continue {/* success toast here */}
			</button>
		</div>
	);
}

export default SignUpPanel;
