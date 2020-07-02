import React from 'react';
import DishesDetails from './DishesDetails';
import AddressValidation from './AddressValidation';
import './OrderDetails.css';

// Send info to eMail
import emailjs from 'emailjs-com';

// Bootstrap modules
import { Container, Row, Col, Button } from 'react-bootstrap';

// Handle payments with Stripe
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
	'pk_test_51GwkS9AhsXSRq7ctMS9vxsTFtWBXCbhcvkWunSZjxuhgjxLZO0SVFMUejI9rAolewXNRv7Cl11qg6k66Lb4qhGuX008luK1bg3'
);

class OrderDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
			showAddressValidation: false,
			entrega: {
				nomReserva: '',
				entrega: '',
				address: '',
				tel: '',
				comentaris: ''
			}
		};
	}
	_backToCheckoutDetails = () => {
		this.setState({
			showAddressValidation: false
		});
	};
	foodRow = () => {
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
					<Col className="d-flex align-items-center justify-content-center">
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
					<Col className="d-flex align-items-center justify-content-center">
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
					<Col className="d-flex align-items-center justify-content-center">
						<p>{`${(platPostresCount * menuData[2].price).toFixed(2)} €`}</p>
					</Col>
				</Row>
			);
		}
		return foodArray;
	};
	drinksRow = () => {
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
						<Col className="d-flex align-items-center justify-content-center">
							<p>{`${(drinksPrices[key] * value).toFixed(2)} €`}</p>
						</Col>
					</Row>
				);
			}
		}
		return drinksArray;
	};
	calculateTotalDebit = (ele) => {
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
	setDeliveryAddressAndPay = async (data) => {
		await this.setState({
			entrega: {
				nomReserva: data.nomReserva,
				data: this.props.currDate,
				tenda: data.tenda,
				municipi: data.municipi,
				address: data.address,
				tel: data.tel,
				comentaris: data.comments
			}
		});

		// When the customer clicks on the Button, redirect them to Checkout.
		const stripe = await stripePromise;

		// Add Food
		const lineItems = [];

		if (this.state.primerSegonCount > 0) {
			lineItems.push({ price: 'price_1GxvoPAhsXSRq7ctlanuX0rn', quantity: this.state.primerSegonCount });
		}

		if (this.state.dosPrimersCount > 0) {
			lineItems.push({ price: 'price_1GxvpKAhsXSRq7ctoKSmajN0', quantity: this.state.dosPrimersCount });
		}

		if (this.state.platPostresCount > 0) {
			lineItems.push({ price: 'price_1GxvqUAhsXSRq7ctYSgw51Jk', quantity: this.state.platPostresCount });
		}

		// Add Drinks
		let { water, cola, colaZero, beer, lemonFanta, orangeFanta } = this.props.drinksOrdered;

		let drinksOrdered = { water, cola, colaZero, beer, lemonFanta, orangeFanta };

		let softDrinksCount = 0;
		let beerCount = 0;
		let waterCount = 0;

		for (const [ key, value ] of Object.entries(drinksOrdered)) {
			if (value > 0) {
				switch (key) {
					default:
						console.log('look at your code at line 47 - OrderDetails.jsx');
						break;
					case 'water':
						waterCount += value;
						break;
					case 'cola':
						softDrinksCount += value;
						break;
					case 'colaZero':
						softDrinksCount += value;
						break;
					case 'beer':
						beerCount += value;
						break;
					case 'lemonFanta':
						softDrinksCount += value;
						break;
					case 'orangeFanta':
						softDrinksCount += value;
						break;
				}
			}
		}

		if (softDrinksCount > 0) {
			lineItems.push({ price: 'price_1GykpAAhsXSRq7ctVNSkQMWv', quantity: softDrinksCount });
		}

		if (beerCount > 0) {
			lineItems.push({ price: 'price_1GykptAhsXSRq7ctyAeWh0XK', quantity: beerCount });
		}

		if (waterCount > 0) {
			lineItems.push({ price: 'price_1GykpZAhsXSRq7ctz7mgukJu', quantity: waterCount });
		}

		// Send e-mail with details
		emailjs.init('user_CLV17QcqSK8FF0oD6nMWg');

		const { nomReserva, tenda, municipi, address, tel, comentaris } = this.state.entrega;
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
		const begudesDetallades = [];
		for (const [ key, value ] of Object.entries(drinksOrdered)) {
			if (value > 0) {
				switch (key) {
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

		const templateParams = {
			data: this.props.currDate.toDateString(),
			comanda: menusDetallats.join(),
			begudes: begudesDetallades.join(),
			totalPrice: this.calculateTotalDebit(this.state.menuData),
			nomReserva: nomReserva,
			tenda: tenda,
			municipi: municipi,
			address: address,
			tel: tel,
			comentaris: comentaris
		};

		const serviceId = 'default_service';
		const templateId = 'template_vprh5Y0S';
		await emailjs.send(serviceId, templateId, templateParams);

		// Stripe checkout
		const { error } = await stripe.redirectToCheckout({
			lineItems: lineItems,
			mode: 'payment',
			successUrl: 'https://example.com/success',
			cancelUrl: 'https://example.com/cancel'
		});
		// If `redirectToCheckout` fails due to a browser or network
		// error, display the localized error message to your customer
		// using `error.message`.
		if (error) console.log(error.message);
	};
	validateAddress = () => {
		this.setState({
			showOrderDetails: false,
			showAddressValidation: true
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
		if (this.state.showAddressValidation === false) {
			return (
				<Container id="checkout-row">
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
						<Col className="d-flex justify-content-center">
							<p>
								<b>Total</b>
							</p>
						</Col>
					</Row>
					<hr />
					{this.foodRow()}
					{this.drinksRow()}
					<Row id="grandTotal">
						<Col>
							<p>
								<b>Total</b>
							</p>
						</Col>
						<Col />
						<Col className="d-flex justify-content-center">
							<p>
								<b>{` ${this.calculateTotalDebit(this.state.menuData)} €`}</b>
							</p>
						</Col>
					</Row>
					<Row>
						{/* <Button role="link" variant="success" onClick={stripePayment}>
							Pagar
						</Button> */}
						<Button variant="success" onClick={this.validateAddress}>
							Pagar
						</Button>
					</Row>
					<Row>
						<Button id="orderDrinks" variant="info" onClick={this.props.toDrinks}>
							Begudes
						</Button>
					</Row>
					<Row>
						<Button id="back" onClick={this.props._back}>
							Enrrere
						</Button>
					</Row>
					<hr />
					<h1>Detalls</h1>
					<DishesDetails menus={this.props.menus} />
				</Container>
			);
		} else {
			return (
				<Container id="checkout-row">
					<AddressValidation
						showAddressValidation={this.state.showAddressValidation}
						setDeliveryAddressAndPay={this.setDeliveryAddressAndPay}
						_backToCheckoutDetails={this._backToCheckoutDetails}
					/>
				</Container>
			);
		}
	}
}

export default OrderDetails;
