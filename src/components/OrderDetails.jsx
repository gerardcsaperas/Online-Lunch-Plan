import React from 'react';
import DishesDetails from './DishesDetails';
import AddressValidation from './AddressValidation';
import CardInput from './CardInput';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './styles/OrderDetails.css';

// Bootstrap modules
import { Container, Row, Col, Button } from 'react-bootstrap';

class OrderDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stripePromise: '',
			primerSegonCount: 0,
			dosPrimersCount: 0,
			platPostresCount: 0,
			menuData: [
				{
					menuType: 'Menú Complet',
					price: 8.95
				},
				{
					menuType: 'Menú 2 Primers',
					price: 7.95
				},
				{
					menuType: 'Mig Menú',
					price: 6.95
				}
			],
			showDeliveryAddressStep: false,
			showCardInputStep: false,
			entrega: {
				nomReserva: '',
				email: '',
				entrega: '',
				address: '',
				tel: '',
				comentaris: ''
			},
			grandTotal: 0
		};
	}
	_backToOrderBasket = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user back to the order basket.
		*/
		this.setState({
			showDeliveryAddressStep: false
		});
	};
	_backToSetDeliveryAddress = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user back to the delivery
				address' step.
		*/
		this.setState({
			showDeliveryAddressStep: true,
			showCardInputStep: false
		});
	};
	_toDeliveryAddress = async () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to the Delivery
				Address' screen.
		*/
		if (
			this.state.platPostresCount === 0 &&
			this.state.dosPrimersCount === 0 &&
			this.state.primerSegonCount === 0
		) {
			return alert('Ha de seleccionar algún menú per procedir al pagament.');
		}

		const stripePromise = await loadStripe(
			'pk_test_51GwkS9AhsXSRq7ctMS9vxsTFtWBXCbhcvkWunSZjxuhgjxLZO0SVFMUejI9rAolewXNRv7Cl11qg6k66Lb4qhGuX008luK1bg3'
		);

		this.setState({
			showOrderDetails: false,
			showDeliveryAddressStep: true,
			stripePromise: stripePromise
		});
	};
	foodRow = () => {
		/*
		type	DISPLAY
		desc.	Render food ordered dinamically
				in the order basket.
		*/
		let primerSegonCount = 0;
		let dosPrimersCount = 0;
		let platPostresCount = 0;

		for (let i of this.props.cashRegister) {
			switch (i.menuType) {
				default:
					console.log('You got a problem @line 26, CheckOutChildren.js');
					break;
				case 'primerSegon':
					primerSegonCount++;
					break;
				case 'dosPrimers':
					dosPrimersCount++;
					break;
				case 'platPostres':
					platPostresCount++;
					break;
			}
		}

		let foodArray = [];
		const { menuData } = this.state;

		if (primerSegonCount > 0) {
			foodArray.push(
				<Row key="primerSegon" id="checkout-elements-row">
					<Col>
						<p>{menuData[0].menuType}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{primerSegonCount}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-end">
						<p>{`${(primerSegonCount * menuData[0].price).toFixed(2)} €`}</p>
					</Col>
				</Row>
			);
		}

		if (dosPrimersCount > 0) {
			foodArray.push(
				<Row key="dosPrimers" id="checkout-elements-row">
					<Col>
						<p>{menuData[1].menuType}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{dosPrimersCount}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-end">
						<p>{`${(dosPrimersCount * menuData[1].price).toFixed(2)} €`}</p>
					</Col>
				</Row>
			);
		}

		if (platPostresCount > 0) {
			foodArray.push(
				<Row key="platPostres" id="checkout-elements-row">
					<Col>
						<p>{menuData[2].menuType}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{platPostresCount}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-end">
						<p>{`${(platPostresCount * menuData[2].price).toFixed(2)} €`}</p>
					</Col>
				</Row>
			);
		}
		return foodArray;
	};
	drinksRow = () => {
		/*
		type	DISPLAY
		desc.	Render drinks ordered dinamically
				in the order basket.
		*/
		let { water, cola, colaZero, beer, lemonFanta, orangeFanta } = this.props.drinksOrdered;

		let drinksOrdered = { water, cola, colaZero, beer, lemonFanta, orangeFanta };
		let drinksPrices = {
			water: 1.0,
			cola: 1.3,
			colaZero: 1.3,
			beer: 1.5,
			lemonFanta: 1.3,
			orangeFanta: 1.3
		};
		let drinksDisplayNames = {
			water: 'Aigua',
			cola: 'Coca-Cola',
			colaZero: 'Coca-Cola Zero',
			beer: 'Estrella Damm',
			lemonFanta: 'Fanta Llimona',
			orangeFanta: 'Fanta Taronja'
		};
		let drinksArray = [];

		for (const [ key, value ] of Object.entries(drinksOrdered)) {
			if (value > 0) {
				drinksArray.push(
					<Row key={key} id="checkout-elements-row">
						<Col className="d-flex">
							<p>{drinksDisplayNames[key]}</p>
						</Col>
						<Col className="d-flex align-items-center justify-content-center">
							<p>{value}</p>
						</Col>
						<Col className="d-flex align-items-center justify-content-end">
							<p>{`${(drinksPrices[key] * value).toFixed(2)} €`}</p>
						</Col>
					</Row>
				);
			}
		}
		return drinksArray;
	};
	calculateTotalDebit = (ele) => {
		/*
		type	CALCULATION

		desc.	Display the total sum of the order
				in the front-end side for the customer
				to dinamically see.
		*/
		// Food
		const primerSegonTotalDebit = ele[0].price * this.state.primerSegonCount;
		const dosPrimersTotalDebit = ele[1].price * this.state.dosPrimersCount;
		const platPostresTotalDebit = ele[2].price * this.state.platPostresCount;

		// Drinks
		const { water, cola, colaZero, beer, lemonFanta, orangeFanta } = this.props.drinksOrdered;
		let drinksOrdered = { water, cola, colaZero, beer, lemonFanta, orangeFanta };
		let drinksPrices = {
			water: 1.0,
			cola: 1.3,
			colaZero: 1.3,
			beer: 1.5,
			lemonFanta: 1.3,
			orangeFanta: 1.3
		};

		let drinksTotalAmmount = 0;

		for (const [ key, value ] of Object.entries(drinksOrdered)) {
			if (value > 0) {
				drinksTotalAmmount += value * drinksPrices[key];
			}
		}

		const grandTotal = primerSegonTotalDebit + dosPrimersTotalDebit + platPostresTotalDebit + drinksTotalAmmount;
		return grandTotal.toFixed(2);
	};
	sendEmail = () => {
		/*
		type	POST api/send-email
				(NODEMAILER)

		desc.	Once the payment has been successfully
				processed, send email with order details
				to both business and customer. 
		*/
		// Delivery Info
		const { nomReserva, email, tenda, municipi, address, tel, comentaris } = this.state.entrega;

		// FOOD
		const menusDetallats = [];
		this.props.menus.map((menu, i) => {
			switch (menu.menuType) {
				default:
					console.log('There has been a problem around line 291 - OrderDetails.jsx');
					break;
				case 'primerSegon':
					menusDetallats.push(`${i + 1}. Menú Complet: ${menu.primer} + ${menu.segon} + ${menu.postres}<br>`);
					break;
				case 'dosPrimers':
					menusDetallats.push(
						`${i + 1}. Menú 2 Primers: ${menu.primerA} + ${menu.primerB} + ${menu.postres}<br>`
					);
					break;
				case 'platPostres':
					menusDetallats.push(`${i + 1}. Mig Menú: ${menu.platUnic} + ${menu.postres}<br>`);
					break;
			}
		});

		// DRINKS
		let { water, cola, colaZero, beer, lemonFanta, orangeFanta } = this.props.drinksOrdered;

		let drinksOrdered = { water, cola, colaZero, beer, lemonFanta, orangeFanta };
		const begudesDetallades = [];
		for (const [ key, value ] of Object.entries(drinksOrdered)) {
			if (value > 0) {
				switch (key) {
					default:
						console.log('You have an issue in OrderDetails.jsx -> sendEmail()');
						break;
					case 'water':
						begudesDetallades.push(`Aigua: ${value} u.<br>`);
						break;
					case 'cola':
						begudesDetallades.push(`Coca-Cola: ${value} u.<br>`);
						break;
					case 'colaZero':
						begudesDetallades.push(`Coca-Cola Zero: ${value} u.<br>`);
						break;
					case 'beer':
						begudesDetallades.push(`Estrella Damm: ${value} u.<br>`);
						break;
					case 'lemonFanta':
						begudesDetallades.push(`Fanta Llimona: ${value} u.<br>`);
						break;
					case 'orangeFanta':
						begudesDetallades.push(`Fanta Taronja: ${value} u.<br>`);
						break;
				}
			}
		}

		// Fetch Back-end request (NODEMAILER)
		fetch('/api/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: this.props.currDate.toDateString(),
				comanda: menusDetallats.join(),
				begudes: begudesDetallades.join(),
				totalPrice: this.calculateTotalDebit(this.state.menuData),
				nomReserva: nomReserva,
				email: email,
				tenda: tenda,
				municipi: municipi,
				address: address,
				tel: tel,
				comentaris: comentaris
			})
		});
	};
	setDeliveryAddressAndPay = async (data) => {
		/*
		type	STATE STORAGE -> DELIVERY ADDRESS
		desc.	Sets the delivery information provided
				by the customer.

				Then, take the user to card input step.
		*/
		await this.setState({
			entrega: {
				nomReserva: data.nomReserva,
				email: data.email,
				data: this.props.currDate,
				tenda: data.tenda,
				municipi: data.municipi,
				address: data.address,
				tel: data.tel,
				comentaris: data.comments
			},
			showDeliveryAddressStep: false,
			showCardInputStep: true,
			grandTotal: this.calculateTotalDebit(this.state.menuData)
		});
	};
	componentDidMount() {
		let primerSegonCount = 0;
		let dosPrimersCount = 0;
		let platPostresCount = 0;

		for (let i of this.props.cashRegister) {
			switch (i.menuType) {
				default:
					console.log('You got a problem @line 26, CheckOutChildren.js');
					break;
				case 'primerSegon':
					primerSegonCount++;
					break;
				case 'dosPrimers':
					dosPrimersCount++;
					break;
				case 'platPostres':
					platPostresCount++;
					break;
			}
		}

		this.setState({
			primerSegonCount: primerSegonCount,
			dosPrimersCount: dosPrimersCount,
			platPostresCount: platPostresCount
		});
	}
	render() {
		if (this.state.showDeliveryAddressStep === false && this.state.showCardInputStep === false) {
			return (
				<Container id="checkout-row">
					<Col xs={12}>
						<h1>La teva comanda</h1>
					</Col>
					<Col xs={12}>
						<hr />
					</Col>
					<Row id="description-row">
						<Col>
							<p>
								<b>Desc.</b>
							</p>
						</Col>
						<Col className="d-flex justify-content-center">
							<p>
								<b>Quant.</b>
							</p>
						</Col>
						<Col className="d-flex justify-content-end">
							<p>
								<b>Total</b>
							</p>
						</Col>
					</Row>
					<hr />
					{this.foodRow()}
					{this.drinksRow()}
					<Row id="grandTotal">
						<Col className="d-flex justify-content-start">
							<p>
								<b>Total</b>
							</p>
						</Col>
						<Col />
						<Col className="d-flex justify-content-end">
							<p>
								<b>{` ${this.calculateTotalDebit(this.state.menuData)} €`}</b>
							</p>
						</Col>
					</Row>
					<Row>
						<Button variant="success" onClick={this._toDeliveryAddress}>
							Pagar
						</Button>
					</Row>
					<Row>
						<Button id="orderDrinks" variant="info" onClick={this.props._toOrderDrinks}>
							Begudes
						</Button>
					</Row>
					<Row>
						<Button id="back" onClick={this.props._toShowMenu}>
							Enrrere
						</Button>
					</Row>
					<hr />
					<h1>Detalls</h1>
					<DishesDetails menus={this.props.menus} />
				</Container>
			);
		} else if (this.state.showDeliveryAddressStep === true) {
			return (
				<Container id="checkout-row">
					<AddressValidation
						showDeliveryAddressStep={this.state.showDeliveryAddressStep}
						setDeliveryAddressAndPay={this.setDeliveryAddressAndPay}
						_backToOrderBasket={this._backToOrderBasket}
					/>
				</Container>
			);
		} else if (this.state.showCardInputStep === true) {
			return (
				<Container id="checkout-row">
					<Elements stripe={this.state.stripePromise}>
						<CardInput
							nomReserva={this.state.entrega.nomReserva}
							currDate={this.props.currDate}
							drinksOrdered={this.props.drinksOrdered}
							primerSegonCount={this.state.primerSegonCount}
							dosPrimersCount={this.state.dosPrimersCount}
							platPostresCount={this.state.platPostresCount}
							grandTotal={this.state.grandTotal}
							sendEmail={this.sendEmail}
							_backToSetDeliveryAddress={this._backToSetDeliveryAddress}
						/>
					</Elements>
				</Container>
			);
		}
	}
}

export default OrderDetails;
