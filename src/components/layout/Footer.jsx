import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
	return (
		<footer>
			<div className="legal-links">
				<Link to="/avis-legal">Avís Legal</Link>
				<Link to="/politica-cookies">Política de Cookies</Link>
				<Link to="/politica-privacitat">Política de Privacitat</Link>
			</div>

			<div className="copyright">
				<p>© Càtering Roser</p>
				<p>Made with ❤ by Gerard C. Saperas</p>
			</div>

			<div className="social-buttons">
				<button id="facebook" href="https://www.facebook.com/pg/Catering-Roser-115543026513080/photos/" />
				<button id="instagram" href="https://www.instagram.com/cateringsroser/" />
			</div>
		</footer>
	);
}
