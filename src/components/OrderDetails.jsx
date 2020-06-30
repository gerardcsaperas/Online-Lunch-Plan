import React from 'react';
import DishesDetails from './DishesDetails';
import './OrderDetails.css';

// Bootstrap modules
import { Container, Row, Col, Button } from 'react-bootstrap';

// Handle payments with Stripe
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
	'pk_test_51GwkS9AhsXSRq7ctMS9vxsTFtWBXCbhcvkWunSZjxuhgjxLZO0SVFMUejI9rAolewXNRv7Cl11qg6k66Lb4qhGuX008luK1bg3'
);

function OrderDetails(props) {
	const stripePayment = async (event) => {
		// When the customer clicks on the Button, redirect them to Checkout.
		const stripe = await stripePromise;

		// Add Food
		const lineItems = [];

		if (primerSegonCount > 0) {
			lineItems.push({ price: 'price_1GxvoPAhsXSRq7ctlanuX0rn', quantity: primerSegonCount });
		}

		if (dosPrimersCount > 0) {
			lineItems.push({ price: 'price_1GxvpKAhsXSRq7ctoKSmajN0', quantity: dosPrimersCount });
		}

		if (platPostresCount > 0) {
			lineItems.push({ price: 'price_1GxvqUAhsXSRq7ctYSgw51Jk', quantity: platPostresCount });
		}

		// Add Drinks
		let { water, cola, colaZero, beer, lemonFanta, orangeFanta } = props.drinksOrdered;

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

	let primerSegonCount = 0;
	let dosPrimersCount = 0;
	let platPostresCount = 0;

	const menuData = [
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
	];

	for (let i of props.cashRegister) {
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

	const primerSegonRow = (ele) => {
		if (primerSegonCount > 0) {
			return (
				<Row id="checkout-elements-row">
					<Col>
						<p>{ele.menuType}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{primerSegonCount}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{`${(primerSegonCount * ele.price).toFixed(2)} €`}</p>
					</Col>
				</Row>
			);
		}
	};

	const dosPrimersRow = (ele) => {
		if (dosPrimersCount > 0) {
			return (
				<Row id="checkout-elements-row">
					<Col>
						<p>{ele.menuType}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{dosPrimersCount}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{`${(dosPrimersCount * ele.price).toFixed(2)} €`}</p>
					</Col>
				</Row>
			);
		}
	};

	const platPostresRow = (ele) => {
		if (platPostresCount > 0) {
			return (
				<Row id="checkout-elements-row">
					<Col>
						<p>{ele.menuType}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{platPostresCount}</p>
					</Col>
					<Col className="d-flex align-items-center justify-content-center">
						<p>{`${(platPostresCount * ele.price).toFixed(2)} €`}</p>
					</Col>
				</Row>
			);
		}
	};

	const drinksRow = () => {
		let { water, cola, colaZero, beer, lemonFanta, orangeFanta } = props.drinksOrdered;

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
					<Row id="checkout-elements-row">
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

	const calculateTotalDebit = (ele) => {
		// Food
		const primerSegonTotalDebit = ele[0].price * primerSegonCount;
		const dosPrimersTotalDebit = ele[1].price * dosPrimersCount;
		const platPostresTotalDebit = ele[2].price * platPostresCount;

		// Drinks
		const { water, cola, colaZero, beer, lemonFanta, orangeFanta } = props.drinksOrdered;
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
			{primerSegonRow(menuData[0])}
			{dosPrimersRow(menuData[1])}
			{platPostresRow(menuData[2])}
			{drinksRow()}
			<Row id="grandTotal">
				<Col>
					<p>
						<b>Total</b>
					</p>
				</Col>
				<Col />
				<Col className="d-flex justify-content-center">
					<p>
						<b>{` ${calculateTotalDebit(menuData)} €`}</b>
					</p>
				</Col>
			</Row>
			<Row>
				<Button role="link" onClick={stripePayment}>
					Pagar
				</Button>
			</Row>
			<Row>
				<Button id="orderDrinks" onClick={props.toDrinks}>
					Begudes
				</Button>
			</Row>
			<Row>
				<Button id="back" onClick={props._back}>
					Enrrere
				</Button>
			</Row>
			<hr />
			<h1>Detalls</h1>
			<DishesDetails menus={props.menus} />
		</Container>
	);
}

export default OrderDetails;
