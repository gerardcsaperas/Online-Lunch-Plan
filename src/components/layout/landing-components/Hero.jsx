import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button } from 'react-bootstrap';

export default function Hero() {
	return (
		<Container id="Hero" className="d-flex flex-column justify-content-center align-content-center">
			<Row id="hero-logo" className="align-self-center mb-4" />
			<Row className="align-self-center mb-4 display-4" id="hero-text">
				Menjar per emportar
			</Row>
			<Link id="demanar-menu" to="/menu-diari">
				<Button className="align-self-center">Menú Diari</Button>
			</Link>
			<img id="arrow-down" src={require('../../../assets/images/iconmonstr-angel-down-thin-240.png')} alt="" />
		</Container>
	);
}
