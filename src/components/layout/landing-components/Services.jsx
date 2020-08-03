import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Button, Col, Card } from 'react-bootstrap';

export default function Services(props) {
	return (
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
									id="img-menudiari"
									src={require('../../../assets/images/650x435-menudiari.jpeg')}
								/>
								<Card.Body>
									<Card.Title>Menú Diari</Card.Title>
									<Card.Text className="p">
										De dilluns a divendres. <br />Recollida a tenda o a domicili.
									</Card.Text>
									<Link to="/menu-diari">
										<Button variant="primary">Veure Més</Button>
									</Link>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={4}>
							<Card className="text-center">
								<Card.Img variant="top" src={require('../../../assets/images/650x435-menumig.jpeg')} />
								<Card.Body>
									<Card.Title>Càtering Empreses</Card.Title>
									<Card.Text className="p">
										Escull els plats i tapes que més s'ajustin al teu esdeveniment.
									</Card.Text>
									<Button variant="primary" href="https://www.cateringroser.es/es/">
										Veure més
									</Button>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={4}>
							<Card className="text-center">
								<Card.Img variant="top" src={require('../../../assets/images/650x435-gyoza.jpeg')} />
								<Card.Body>
									<Card.Title>Càtering Esdeveniments</Card.Title>
									<Card.Text className="p">
										Servei integral de restauració per a festes i reunions.
									</Card.Text>
									<Button variant="primary" href="https://www.cateringroser.es/es/">
										Veure més
									</Button>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
