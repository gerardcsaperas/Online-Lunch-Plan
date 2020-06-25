import React, { Component } from 'react';
import './CheckOut.css';
import CheckOutChildren from './CheckOutChildren';

export class CheckOut extends Component {
	render() {
		if (this.props.showCheckOut) {
			return (
				<div>
					<button id="checkout" onClick={this.props.showHide} />
					<div id="your-order">
						<h1>La teva comanda</h1>
						<hr />
						<CheckOutChildren
							menus={this.props.menus}
							cashRegister={this.props.cashRegister}
							toPayment={this.props.toPayment}
						/>
					</div>
				</div>
			);
		} else {
			return <button id="checkout" onClick={this.props.showHide} />;
		}
	}
}

export default CheckOut;
