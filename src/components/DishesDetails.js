import React from 'react';
import './DishesDetails.css';

function DishesDetails(props) {
	const renderDishes = props.menus.map((menu, i) => {
		switch (menu.menuType) {
			default:
				console.log('You got a problem @line 82, Step3.js. [renderDishes()]');
				break;
			case 'primerSegon':
				return (
					<div key={i} className="dishes-details-row">
						<hr />
						<p>Menú Complet</p>
						<p>{menu.primer}</p>
						<p>{menu.segon}</p>
						<p>{menu.postres}</p>
					</div>
				);
			case 'dosPrimers':
				return (
					<div key={i} className="dishes-details-row">
						<hr />
						<p>Menú 2 Primers</p>
						<p>{menu.primerA}</p>
						<p>{menu.primerB}</p>
						<p>{menu.postres}</p>
					</div>
				);
			case 'platPostres':
				return (
					<div key={i} className="dishes-details-row">
						<hr />
						<p>Mig Menú</p>
						<p>{menu.platUnic}</p>
						<p>{menu.postres}</p>
					</div>
				);
		}
	});

	return <div>{renderDishes}</div>;
}

export default DishesDetails;
