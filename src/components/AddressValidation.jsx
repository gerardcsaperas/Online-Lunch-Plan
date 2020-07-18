import React from 'react';
import './styles/AddressValidation.css';

// Bootstrap
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';

class AddressValidation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nomReserva: '',
			email: '',
			tenda: '',
			municipi: '',
			address: '',
			tel: '',
			comments: '',
			payButtonPressed: false
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
	setEmail = (e) => {
		let email = e.target.value;

		this.setState({
			email: email
		});
	};
	setMunicipi = (e) => {
		let location = e.target.value;

		let tendes = [ 'tenda-cabrera', 'tenda-tenis', 'tenda-vdm' ];
		let municipis = [ 'argentona', 'cabrera-de-mar', 'cabrils', 'mataro', 'vilassar-de-mar', 'vilassar-de-dalt' ];

		if (tendes.includes(location)) {
			this.setState({
				tenda: location,
				municipi: ''
			});
		} else if (municipis.includes(location)) {
			this.setState({
				tenda: '',
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
	passToParentAndPay = async () => {
		const { nomReserva, tenda, municipi, address, tel, comments, email } = this.state;

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

		await this.setState({
			payButtonPressed: true
		});

		this.props.setDeliveryAddressAndPay(this.state);
	};
	render() {
		if (this.props.showAddressValidation === true) {
			return (
				<Container id="AddressValidation">
					<Row>
						<Col xs={12}>
							<h1>Detalls d'entrega</h1>
						</Col>
						<Col xs={12} md={10}>
							<hr />
						</Col>
						<Col xs={12}>
							<Form>
								<Form.Row className="d-flex justify-content-center">
									<Col xs={12} md={8} className="mb-2">
										<Form.Label htmlFor="nomReserva">Nom Complet</Form.Label>
										<Form.Control
											id="nomReserva"
											placeholder="Nom Complet (mateix que targeta pagament)"
											onChange={this.setCustomerName}
											required
										/>
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Label htmlFor="email">Correu Electrònic</Form.Label>
										<Form.Control
											id="email"
											type="email"
											placeholder="correu@example.com"
											onChange={this.setEmail}
											required
										/>
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Label htmlFor="municipi">Municipi</Form.Label>
										<Form.Control as="select" id="municipi" onChange={this.setMunicipi}>
											<option value="">Recollir/Enviar a...</option>
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
										<Form.Label htmlFor="address">Direcció</Form.Label>
										<Form.Control
											id="address"
											placeholder="c/Exemple, Num, Porta..."
											onChange={this.setAddress}
										/>
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Label htmlFor="tel">Telèfon</Form.Label>
										<Form.Control id="tel" placeholder="666777888" onChange={this.setTelephone} />
									</Col>
									<Col xs={12} md={8} className="mb-2">
										<Form.Label htmlFor="comments">Comentaris</Form.Label>
										<Form.Control
											id="comments"
											placeholder="A quina hora ho voldries rebre? Altres Comentaris."
											onChange={this.setComments}
										/>
									</Col>
									<Col xs={12} md={8} className="d-flex justify-content-center">
										{this.state.payButtonPressed ? (
											<Spinner animation="border" variant="success" className="mb-2" />
										) : (
											<Button variant="success" onClick={this.passToParentAndPay}>
												Pagar
											</Button>
										)}
									</Col>
									<Col xs={12} md={8} className="d-flex justify-content-center">
										{this.state.payButtonPressed ? null : (
											<Button onClick={this._back}>Enrrere</Button>
										)}
									</Col>
								</Form.Row>
							</Form>
						</Col>
					</Row>
					<Row>
						<p>
							*Les entregues s'efectuaràn de 11:00 a 15:00. L'empresa es reserva un marge de fins a 30'
							entre l'hora d'entrega demanada per el client i l'hora real.
						</p>
					</Row>
				</Container>
			);
		} else {
			return null;
		}
	}
}

export default AddressValidation;
