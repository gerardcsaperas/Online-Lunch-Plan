import React, { Component } from 'react';
import './OrderBasket.css';
import OrderDetails from './OrderDetails';

export class OrderBasket extends Component {
	render() {
		if (this.props.showCheckOut) {
			return (
				<div>
					<button id="toOrderBasket" onClick={this.props.showHide} />
					<div id="OrderBasket">
						<h1>La teva comanda</h1>
						<hr />
						<OrderDetails
							menus={this.props.menus}
							cashRegister={this.props.cashRegister}
							drinksOrdered={this.props.drinksOrdered}
							toPayment={this.props.toPayment}
							toDrinks={this.props.toDrinks}
							_back={this.props._back}
						/>
					</div>
				</div>
			);
		} else {
			return <button id="toOrderBasket" onClick={this.props.showHide} />;
		}
	}
}

export default OrderBasket;
