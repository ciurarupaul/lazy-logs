import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

function Footer() {
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
				<FaGithub />
				<FaLinkedin />
			</div>
		</footer>
	);
}

export default Footer;
