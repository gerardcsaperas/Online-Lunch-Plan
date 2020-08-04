import React, { useState } from 'react';

// Bootstrap
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

// Send info to eMail
import emailjs from 'emailjs-com';

export default function Contact() {
	/////////////////////////////////////////////////////////
	//////// Contact form's state handler and logic ////////
	///////////////////////////////////////////////////////
	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');
	const [ tel, setTel ] = useState('');
	const [ comments, setComments ] = useState('');
	const [ submitted, setSubmitted ] = useState(null);
	const [ sent, setSent ] = useState(null);
	const handleEmailChange = async (e) => {
		setEmail(e.target.value);
	};
	const handleNameChange = async (e) => {
		setName(e.target.value);
	};
	const handleTelChange = async (e) => {
		setTel(e.target.value);
	};
	const handleCommentsChange = async (e) => {
		setComments(e.target.value);
	};
	const handleSubmit = async (ev) => {
		ev.preventDefault();
		setSubmitted(true);
		emailjs.init(process.env.REACT_APP_EMAILJS_USER);

		let template_params = {
			user_name: name,
			user_email: email,
			user_tel: tel,
			user_comments: comments
		};

		let service_id = 'default_service';
		let template_id = 'contact_form';
		await emailjs.send(service_id, template_id, template_params);
		setSent(true);
	};
	/////////////////////////////////////////////////////////
	//////// Render Component //////////////////////////////
	///////////////////////////////////////////////////////
	return (
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
									<Form.Control
										required
										name="user_email"
										value={email}
										onChange={handleEmailChange}
										type="email"
										placeholder="exemple@exemple.com"
									/>
									<Form.Text className="text-muted">
										No compartirem el teu correu amb ningú.
									</Form.Text>
								</Form.Group>
								<Form.Group controlId="nomCognoms">
									<Form.Label>Nom i Cognoms</Form.Label>
									<Form.Control
										required
										name="user_name"
										value={name}
										onChange={handleNameChange}
										type="text"
										placeholder="Nom Exemple"
									/>
								</Form.Group>
								<Form.Group controlId="telefon">
									<Form.Label>Telèfon</Form.Label>
									<Form.Control
										name="user_tel"
										value={tel}
										onChange={handleTelChange}
										type="text"
										placeholder="666777888"
									/>
								</Form.Group>
								<Form.Group controlId="comentaris">
									<Form.Label>Comentaris</Form.Label>
									<Form.Control
										required
										name="user_comments"
										value={comments}
										onChange={handleCommentsChange}
										type="text"
										placeholder="Escriu els teus comentaris..."
									/>
								</Form.Group>
								{submitted ? (
									<Button disabled type="submit" className="align-self-center">
										Submit
									</Button>
								) : (
									<Button type="submit" className="align-self-center">
										Enviar
									</Button>
								)}
							</Form>
							{sent ? (
								<p>Gràcies pel seu missatge. Ens posarem en contacte en el menor temps possible.</p>
							) : null}
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
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
