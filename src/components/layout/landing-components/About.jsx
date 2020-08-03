import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function About() {
	return (
		<Container id="about" fluid>
			<Row>
				<h1 className="display-3">Nosaltres</h1>
			</Row>
			<Row>
				<Col xs={12} md={10} className="text-center">
					<hr />
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col xs={12} md={5}>
					<Image src={require('../../../assets/images/1000x700-about.jpeg')} fluid rounded />
				</Col>
				<Col
					xs={12}
					md={5}
					id="aboutText"
					className="d-flex justify-content-center align-items-center text-justify"
				>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam minus impedit temporibus
						eligendi, explicabo quaerat facilis quibusdam eos dolores quas veritatis cumque nobis minima!
						Laboriosam, atque fugiat! Quasi labore eveniet porro ex sint...
					</p>
				</Col>
			</Row>
		</Container>
	);
}
