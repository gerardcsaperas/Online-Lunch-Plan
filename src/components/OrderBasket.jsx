import React, { Component } from 'react';
import './styles/OrderBasket.css';
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
		if (this.props.showOrderBasket) {
			return (
				<Container id="OrderBasket">
					<OrderDetails
						menus={this.props.menus}
						cashRegister={this.props.cashRegister}
						drinksOrdered={this.props.drinksOrdered}
						_toPayment={this.props._toPayment}
						_toOrderDrinks={this.props._toOrderDrinks}
						_toShowMenu={this.props._toShowMenu}
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
