import React, { Component } from 'react';
import './OrderBasket.css';
import OrderDetails from './OrderDetails';

// Bootstrap
import { Container } from 'react-bootstrap';

export class OrderBasket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddressValidation: false
		};
	}
	render() {
		if (this.props.showCheckOut) {
			return (
				<Container id="OrderBasket">
					<OrderDetails
						menus={this.props.menus}
						cashRegister={this.props.cashRegister}
						drinksOrdered={this.props.drinksOrdered}
						validateAddress={this.props.validateAddress}
						toPayment={this.props.toPayment}
						toDrinks={this.props.toDrinks}
						_back={this.props._back}
						currDate={this.props.currDate}
					/>
				</Container>
			);
		} else {
			return null;
		}
	}
}

export default OrderBasket;
