import React from 'react';
import DishesDetails from './DishesDetails';
import './CheckOutChildren.css';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
	'pk_test_51GwkS9AhsXSRq7ctMS9vxsTFtWBXCbhcvkWunSZjxuhgjxLZO0SVFMUejI9rAolewXNRv7Cl11qg6k66Lb4qhGuX008luK1bg3'
);

function CheckOutChildren(props) {
	const handleClick = async (event) => {
		// When the customer clicks on the button, redirect them to Checkout.
		const stripe = await stripePromise;

		// Add items
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
			menuType: 'M. Complet',
			price: 8.95
		},
		{
			menuType: '2 Primers',
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
				<div id="checkout-elements-row">
					<p>{ele.menuType}</p>
					<p>{primerSegonCount}</p>
					<p>{`${ele.price} €`}</p>
					<p>{`${(primerSegonCount * ele.price).toFixed(2)} €`}</p>
				</div>
			);
		}
	};

	const dosPrimersRow = (ele) => {
		if (dosPrimersCount > 0) {
			return (
				<div id="checkout-elements-row">
					<p>{ele.menuType}</p>
					<p>{dosPrimersCount}</p>
					<p>{`${ele.price} €`}</p>
					<p>{`${(dosPrimersCount * ele.price).toFixed(2)} €`}</p>
				</div>
			);
		}
	};

	const platPostresRow = (ele) => {
		if (platPostresCount > 0) {
			return (
				<div id="checkout-elements-row">
					<p>{ele.menuType}</p>
					<p>{platPostresCount}</p>
					<p>{`${ele.price} €`}</p>
					<p>{`${(platPostresCount * ele.price).toFixed(2)} €`}</p>
				</div>
			);
		}
	};

	const calculateTotalDebit = (ele) => {
		const primerSegonTotalDebit = ele[0].price * primerSegonCount;
		const dosPrimersTotalDebit = ele[1].price * dosPrimersCount;
		const platPostresTotalDebit = ele[2].price * platPostresCount;

		const grandTotal = primerSegonTotalDebit + dosPrimersTotalDebit + platPostresTotalDebit;

		return grandTotal.toFixed(2);
	};

	return (
		<div id="checkout-row">
			<div id="description-row">
				<p>
					<b>Descripció</b>
				</p>
				<p>
					<b>Quant.</b>
				</p>
				<p>
					<b>€/Unitat</b>
				</p>
				<p>
					<b>Total</b>
				</p>
			</div>
			<hr />
			{primerSegonRow(menuData[0])}
			{dosPrimersRow(menuData[1])}
			{platPostresRow(menuData[2])}
			<div id="grandTotal">
				<p>
					<b>Total</b>
				</p>
				<p>
					<b>{` ${calculateTotalDebit(menuData)} €`}</b>
				</p>
			</div>
			<button role="link" onClick={handleClick}>
				Pagar
			</button>
			<hr />
			<h1>Detalls</h1>
			<DishesDetails menus={props.menus} />
		</div>
	);
}

export default CheckOutChildren;
