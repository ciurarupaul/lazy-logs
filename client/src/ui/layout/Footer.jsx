import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Footer() {
	const navigate = useNavigate();

	const handleGithubRedirect = () => {
		window.location.href = "https://github.com/ciurarupaul";
	};
	const handleLinkedInRedirect = () => {
		window.location.href = "https://www.linkedin.com/in/ciurarupaul/";
	};
	return (
		<footer className="footer">
			<div className="footer__copyright">
				<FaRegCopyright className="footer__copyright-icon" />
				<p className="footer__copyright-text">
					Built by <span>Ciuraru Paul</span>
				</p>
			</div>

			<div className="footer__socials">
				<p className="footer__socials-text">
					See other projects I made
				</p>
				<FaGithub onClick={handleGithubRedirect} />
				<FaLinkedin onClick={handleLinkedInRedirect} />
			</div>
		</footer>
	);
}

export default Footer;
