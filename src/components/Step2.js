import React, { Component } from 'react';
import './Step2.css';

export default class Step2 extends Component {
	render() {
		//Check for the current step
		if (this.props.currentStep !== 2) {
			return null;
		}
		//The markup for Step1 UI
		return (
			<div>
				<h1 className="menuType">Què busques?</h1>
				<hr />
				<div className="row">
					<button id="primerSegon" className="customerNeeds">
						1 Primer<br />1 Segon<br />Postre | Beguda<br />
						<br />8,95 €
					</button>
					<button id="dosPrimers" className="customerNeeds">
						2 Primers<br />
						<br />Postre | Beguda<br />
						<br />7,95 €
					</button>
				</div>
				<div className="row">
					<button id="platPostres" className="customerNeeds">
						1 Plat<br />
						<br />Postre | Beguda<br />
						<br />7,95 €
					</button>
					<button id="serveiCatering" className="customerNeeds">
						Càtering per a events
					</button>
				</div>
			</div>
		);
	}
}
