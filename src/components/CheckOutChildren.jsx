import React from 'react';
import DishesDetails from './DishesDetails';
import './CheckOutChildren.css';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

function CheckOutChildren(props) {
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

	const handleToken = async (token) => {
		const response = await axios.post('/checkout', {
			token,
			grandTotal: (calculateTotalDebit(menuData) * 100).toFixed(2),
			products: [ primerSegonCount, dosPrimersCount, platPostresCount ]
		});

		console.log(response);
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
			<StripeCheckout
				stripeKey="pk_test_51GwkS9AhsXSRq7ctMS9vxsTFtWBXCbhcvkWunSZjxuhgjxLZO0SVFMUejI9rAolewXNRv7Cl11qg6k66Lb4qhGuX008luK1bg3"
				token={handleToken}
				billingAddress
				shippingAddress
				amount={(calculateTotalDebit(menuData) * 100).toFixed(2)}
				currency="EUR"
			/>
			<hr />
			<h1>Detalls</h1>
			<DishesDetails menus={props.menus} />
		</div>
	);
}

export default CheckOutChildren;
