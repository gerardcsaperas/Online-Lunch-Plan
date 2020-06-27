import React, { Component } from 'react';
import './Step2.css';

export default class Step2 extends Component {
	render() {
		//Check for the current step
		if (this.props.currentStep !== 2) {
			return null;
		}
		//The markup for Step2 UI
		return (
			<div className="Step2">
				<h1 className="menuType">Què busques?</h1>
				<hr />
				<div className="row">
					<button id="primerSegon" type="button" className="customerNeeds" onClick={this.props.handleClick}>
						1 Primer<br />1 Segon<br />Postre | Beguda<br />
						<br />8,95 €
					</button>
					<button id="dosPrimers" type="button" className="customerNeeds" onClick={this.props.handleClick}>
						2 Primers<br />
						<br />Postre | Beguda<br />
						<br />7,95 €
					</button>
				</div>
				<div className="row">
					<button id="platPostres" type="button" className="customerNeeds" onClick={this.props.handleClick}>
						1 Plat<br />
						<br />Postre | Beguda<br />
						<br />7,95 €
					</button>
					<button id="orderDrinks" type="button" className="customerNeeds" onClick={this.props.toDrinks}>
						Begudes
					</button>
				</div>
				<button id="back" onClick={this.props._back}>
					Enrrere
				</button>
			</div>
		);
	}
}
