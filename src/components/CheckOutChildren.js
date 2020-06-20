import React from 'react';

function CheckOutChildren(props) {
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
		return (
			<div id="checkout-elements">
				<p>{ele.menuType}</p>
				<p>{primerSegonCount}</p>
				<p>{`${ele.price} €`}</p>
				<p>{`${primerSegonCount * ele.price} €`}</p>
			</div>
		);
	};

	const dosPrimersRow = (ele) => {
		if (ele.count > 0) {
			return (
				<div id="checkout-elements">
					<p>{ele.menuType}</p>
					<p>{dosPrimersCount}</p>
					<p>{`${ele.price} €`}</p>
					<p>{`${dosPrimersCount * ele.price} €`}</p>
				</div>
			);
		}
	};

	const platPostresRow = (ele) => {
		if (ele.count > 0) {
			return (
				<div id="checkout-elements">
					<p>{ele.menuType}</p>
					<p>{platPostresCount}</p>
					<p>{`${ele.price} €`}</p>
					<p>{`${platPostresCount * ele.price} €`}</p>
				</div>
			);
		}
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
			</div>
			<hr />
			{primerSegonRow(menuData[0])}
			{dosPrimersRow(menuData[1])}
			{platPostresRow(menuData[2])}
		</div>
	);
}

export default CheckOutChildren;
