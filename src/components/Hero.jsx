import React, { useState } from 'react';
import './Hero.css';

// Bootstrap
import { Container, Row, Col, Button, Card, Form, Image } from 'react-bootstrap';

function Hero(props) {
	const [ email, setEmail ] = useState(null);
	const [ name, setName ] = useState(null);
	const [ tel, setTel ] = useState(null);
	const [ comments, setComments ] = useState(null);
	const handleChange = (e) => {
		console.log(e.target);
	};
	const handleSubmit = (ev) => {
		ev.preventDefault();
		console.log(ev);
	};
	return (
		<Container fluid id="HeroContainer">
			<Container id="Hero" className="d-flex flex-column justify-content-center align-content-center">
				<Row id="hero-logo" className="align-self-center mb-4" />
				<Row className="align-self-center mb-4 display-4" id="hero-text">
					Menjar per emportar
				</Row>
				<Button className="align-self-center" id="hero-btn" onClick={props.goToApp}>
					Menú Diari
				</Button>
			</Container>
			<Container id="services" fluid>
				<Row>
					<h1 className="display-3">Serveis</h1>
				</Row>
				<Row>
					<Col xs={12} md={10}>
						<hr />
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={10}>
						<Row>
							<Col xs={12} md={4}>
								<Card className="text-center">
									<Card.Img
										variant="top"
										src={require('../assets/background-carousel/davide-cantelli-jpkfc5_d-DI-unsplash.jpg')}
									/>
									<Card.Body>
										<Card.Title>Menú Diari</Card.Title>
										<Card.Text className="p">
											De dilluns a divendres. <br />Recollida a tenda o a domicili.
										</Card.Text>
										<Button variant="primary" onClick={props.goToApp}>
											Veure Més
										</Button>
									</Card.Body>
								</Card>
							</Col>
							<Col xs={12} md={4}>
								<Card className="text-center">
									<Card.Img
										variant="top"
										src={require('../assets/background-carousel/brooke-lark-HlNcigvUi4Q-unsplash.jpg')}
									/>
									<Card.Body>
										<Card.Title>Càtering Empreses</Card.Title>
										<Card.Text className="p">
											Escull entre la nostra selecció de tapes i plats els que més s'ajustin al
											teu esdeveniment.
										</Card.Text>
										<Button variant="primary" href="#contacte">
											Contacta'ns
										</Button>
									</Card.Body>
								</Card>
							</Col>
							<Col xs={12} md={4}>
								<Card className="text-center">
									<Card.Img
										variant="top"
										src={require('../assets/background-carousel/abhishek-sanwa-limbu-LR559Dcst70-unsplash.jpg')}
									/>
									<Card.Body>
										<Card.Title>Càtering Esdeveniments</Card.Title>
										<Card.Text className="p">
											Servei integral de menjar i beguda per a les teves festes, reunions,
											casaments, comunions...
										</Card.Text>
										<Button variant="primary" href="#contacte">
											Contacta'ns
										</Button>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
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
						<Image
							src={require('../assets/background-carousel/brooke-lark-HlNcigvUi4Q-unsplash.jpg')}
							fluid
							rounded
						/>
					</Col>
					<Col
						xs={12}
						md={5}
						id="aboutText"
						className="d-flex justify-content-center align-items-center text-justify"
					>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam minus impedit temporibus
							eligendi, explicabo quaerat facilis quibusdam eos dolores quas veritatis cumque nobis
							minima! Laboriosam, atque fugiat! Quasi labore eveniet porro ex sint...
						</p>
					</Col>
				</Row>
			</Container>
			<Container id="contacte" fluid>
				<Row>
					<h1 className="display-3">Contacte</h1>
				</Row>
				<Row>
					<Col xs={12} md={10}>
						<hr />
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={10}>
						<Row>
							<Col xs={12} md={5} id="formCol">
								<Form xs={12} id="contact-form" className="d-flex flex-column" onSubmit={handleSubmit}>
									<Form.Group controlId="formBasicEmail">
										<Form.Label>Correu Electrònic</Form.Label>
										<Form.Control required type="email" placeholder="exemple@exemple.com" />
										<Form.Text className="text-muted">
											No compartirem el teu correu amb ningú.
										</Form.Text>
									</Form.Group>
									<Form.Group controlId="nomCognoms">
										<Form.Label>Nom i Cognoms</Form.Label>
										<Form.Control required type="text" placeholder="Nom Exemple" />
									</Form.Group>
									<Form.Group controlId="telefon">
										<Form.Label>Telèfon</Form.Label>
										<Form.Control type="text" placeholder="666777888" />
									</Form.Group>
									<Form.Group controlId="comentaris" onChange={handleChange}>
										<Form.Label>Comentaris</Form.Label>
										<Form.Control
											required
											onChange={handleChange}
											type="text"
											placeholder="Escriu els teus comentaris..."
										/>
									</Form.Group>
									<Button type="submit" className="align-self-center">
										Submit
									</Button>
								</Form>
							</Col>
							<Col id="contactCol" className="d-flex flex-column justify-content-around">
								<Row>
									<Col className="text-center">
										<h2 className="display-4">Telèfons</h2>
										<p>608 752 922</p>
										<p>634 963 752</p>
									</Col>
								</Row>
								<Row>
									<Col xs={12} className="text-center">
										<h2 className="display-4">Ubicacions</h2>
									</Col>
									<Row>
										<Col xs={12} md={4} className="text-center">
											<p>
												<b>Vilassar de Mar</b>
											</p>
											<p>Mercat Municipal</p>
											<p>Parada 3</p>
										</Col>
										<Col xs={12} md={4} className="text-center">
											<p>
												<b>Cabrera de Mar</b>
											</p>
											<p>L'Obrador</p>
											<p>Av. Pare Jaume Català, 30-36 3</p>
										</Col>
										<Col xs={12} md={4} className="text-center">
											<p>
												<b>Cabrils</b>
											</p>
											<p>Tenis Sant Crist</p>
											<p>Passatge de les piscines s/n</p>
										</Col>
									</Row>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			<footer id="footer">
				<Row id="legal" className="d-flex justify-content-center align-items-center">
					<Col className="text-center" xs={12} sm={6} md={4}>
						<Row>
							<Col xs={12} md={4}>
								<a href="#">Avís Legal</a>
							</Col>
							<Col xs={12} md={4}>
								<a href="#">Política de Cookies</a>
							</Col>
							<Col xs={12} md={4}>
								<a href="#">Política de Privacitat</a>
							</Col>
						</Row>
					</Col>
					<Col xs={12} md={4}>
						<Row className="madeWithLove d-flex flex-column text-center align-content-center">
							<p>© Catering Roser</p>
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
		</Container>
	);
}

export default Hero;
