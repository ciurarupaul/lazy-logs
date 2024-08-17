import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

function Footer() {
	return (
		<div className="footer">
			<div className="footer__copyright">
				<FaRegCopyright className="footer__copyright-icon" />
				<p className="footer__copyright-text">
					Built by <strong>Ciuraru Paul</strong>
				</p>
			</div>

			<div className="footer__socials">
				<p className="footer__socials-text">
					See other projects I made
				</p>
				<FaGithub />
				<FaLinkedin />
			</div>
		</div>
	);
}

export default Footer;
