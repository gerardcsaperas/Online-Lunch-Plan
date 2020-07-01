import React from 'react';
import './AddressValidation.css';

// Bootstrap
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

class AddressValidation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nomReserva: '',
			tenda: 'tenda-cabrera',
			municipi: '',
			address: '',
			tel: '',
			comments: ''
		};
	}
	_back = () => {
		this.props._backToCheckoutDetails();
	};
	setCustomerName = (e) => {
		let customerName = e.target.value;

		this.setState({
			nomReserva: customerName
		});
	};
	setMunicipi = (e) => {
		let location = e.target.value;

		let tendes = [ 'tenda-cabrera', 'tenda-tenis', 'tenda-vdm' ];
		let municipis = [ 'argentona', 'cabrera-de-mar', 'cabrils', 'mataro', 'vilassar-de-mar', 'vilassar-de-dalt' ];

		if (tendes.includes(location)) {
			this.setState({
				tenda: location
			});
		} else {
			this.setState({
				municipi: location
			});
		}
	};
	setAddress = (e) => {
		let address = e.target.value;

		this.setState({
			address: address
		});
	};
	setTelephone = (e) => {
		let tel = e.target.value;

		this.setState({
			tel: tel
		});
	};
	setComments = (e) => {
		let comments = e.target.value;

		this.setState({
			comments: comments
		});
	};
	passToParentAndPay = () => {
		const { nomReserva, tenda, municipi, address, tel, comments } = this.state;

		if (nomReserva === '') {
			return alert('És obligatori deixar un nom per a la reserva');
		}

		if (tenda === '' && municipi === '') {
			return alert("És obligatori escollir un punt d'entrega o recollida");
		}

		if (municipi !== '' && address === '') {
			return alert("Siusplau, deixa una adreça per a l'entrega");
		}

		if (tel === '') {
			return alert('És obligatori deixar un número de telèfon');
		}

		this.props.setDeliveryAddressAndPay(this.state);
	};
	render() {
		if (this.props.showAddressValidation === true) {
			return (
				<Container id="AddressValidation">
					<Row>
						<Col xs={12}>
							<h1>Adreça d'entrega</h1>
						</Col>
						<Col xs={12}>
							<hr />
						</Col>
						<Col xs={12}>
							<Form>
								<Form.Row className="d-flex justify-content-center">
									<Col xs={12} md={8} className="mb-2">
										<Form.Text>
											<Form.Label htmlFor="nomReserva" srOnly>
												Nom
											</Form.Label>
											<Form.Control
												id="nomReserva"
												placeholder="Nom i Cognoms"
												onChange={this.setCustomerName}
											/>
										</Form.Text>
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Label htmlFor="municipi" srOnly>
											Municipi
										</Form.Label>
										<Form.Control as="select" id="municipi" onChange={this.setMunicipi}>
											<option value="tenda-cabrera">Recollida a tenda - Cabrera de Mar</option>
											<option value="tenda-tenis">Recollida a tenda - Cabrils (Tenis)</option>
											<option value="tenda-vdm">Recollida a tenda - Vilassar de Mar</option>
											<option value="argentona">Argentona</option>
											<option value="cabrera-de-mar">Cabrera de Mar</option>
											<option value="cabrils">Cabrils</option>
											<option value="mataro">Mataró</option>
											<option value="vilassar-de-mar">Vilassar de Mar</option>
											<option value="vilassar-de-dalt">Vilassar de Dalt</option>
										</Form.Control>
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Text>
											<Form.Label htmlFor="address" srOnly>
												Direcció
											</Form.Label>
											<Form.Control
												id="address"
												placeholder="c/Exemple, Num, Porta..."
												onChange={this.setAddress}
											/>
										</Form.Text>
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Text>
											<Form.Label htmlFor="tel" srOnly>
												Telèfon
											</Form.Label>
											<Form.Control
												id="tel"
												placeholder="666777888"
												onChange={this.setTelephone}
											/>
										</Form.Text>
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Text>
											<Form.Label htmlFor="comments" srOnly>
												Comentaris
											</Form.Label>
											<Form.Control
												id="comments"
												placeholder="Altres comentaris..."
												onChange={this.setComments}
											/>
										</Form.Text>
									</Col>
									<Col xs={12} md={8} className="d-flex justify-content-center">
										<Button variant="success" onClick={this.passToParentAndPay}>
											Pagar
										</Button>
									</Col>
									<Col xs={12} md={8} className="d-flex justify-content-center">
										<Button onClick={this._back}>Enrrere</Button>
									</Col>
								</Form.Row>
							</Form>
						</Col>
					</Row>
				</Container>
			);
		} else {
			return null;
		}
	}
}

export default AddressValidation;
