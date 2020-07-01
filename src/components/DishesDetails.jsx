import React from 'react';
import './DishesDetails.css';

function DishesDetails(props) {
	const renderDishes = props.menus.map((menu, i) => {
		switch (menu.menuType) {
			default:
				return console.log('You got a problem @line 82, Step3.js. [renderDishes()]');
			case 'primerSegon':
				return (
					<div key={i} className="dishes-details-row">
						<hr />
						<p>
							<b>Menú Complet</b>
						</p>
						<p> {menu.primer} </p>
						<p> {menu.segon} </p>
						<p> {menu.postres} </p>
					</div>
				);
			case 'dosPrimers':
				return (
					<div key={i} className="dishes-details-row">
						<hr />
						<p>
							<b>Menú 2 Primers</b>
						</p>
						<p> {menu.primerA} </p>
						<p> {menu.primerB} </p>
						<p> {menu.postres} </p>
					</div>
				);
			case 'platPostres':
				return (
					<div key={i} className="dishes-details-row">
						<hr />
						<p>
							<b>Mig Menú</b>
						</p>
						<p> {menu.platUnic} </p>
						<p> {menu.postres} </p>
					</div>
				);
		}
	});

	return <div> {renderDishes} </div>;
}

export default DishesDetails;
