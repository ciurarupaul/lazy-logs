import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

function Footer() {
	const handleGithubRedirect = () => {
		window.open("https://github.com/ciurarupaul", "_blank");
	};

	const handleLinkedInRedirect = () => {
		window.open("https://www.linkedin.com/in/ciurarupaul/", "_blank");
	};

	return (
		<footer className="footer">
			<div className="footer__copyright">
				<FaRegCopyright className="footer__copyright-icon" />
				<p className="footer__copyright-text">
					2024, Built by <span>Paul CIURARU</span>
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
