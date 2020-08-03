import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import '../styles/Landing.css';

export default function Footer() {
	return (
		<footer>
			<Row id="legal" className="d-flex justify-content-center align-items-center">
				<Col className="text-center" xs={12} sm={6} md={4}>
					<Row>
						<Col xs={12}>
							<Link to="/avis-legal">Avís Legal</Link>
						</Col>
						<Col xs={12}>
							<Link to="/politica-cookies">Política de Cookies</Link>
						</Col>
						<Col xs={12}>
							<Link to="/politica-privacitat">Política de Privacitat</Link>
						</Col>
					</Row>
				</Col>
				<Col xs={12} md={4}>
					<Row className="madeWithLove d-flex flex-column text-center align-content-center">
						<p>© Càtering Roser</p>
						<p>Made with ❤ by Gerard C. Saperas</p>
					</Row>
				</Col>
				<Col xs={12} md={4} className="d-flex justify-content-center">
					<Row>
						<Button
							id="facebook"
							href="https://www.facebook.com/pg/Catering-Roser-115543026513080/photos/"
						/>
						<Button id="instagram" href="https://www.instagram.com/cateringsroser/" />
					</Row>
				</Col>
			</Row>
		</footer>
	);
}
