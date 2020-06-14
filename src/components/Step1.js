import React from 'react';
import './Step1.css';

export default class Step1 extends React.Component {
	render() {
		//Check for the current step
		if (this.props.currentStep !== 1) {
			return null;
		}
		//The markup for Step1 UI
		return (
			<div className="Step1">
				<h1 className="menuType">El menú d'avui</h1>
				<hr />
				<h2>Primers</h2>
				<p>Primer 1</p>
				<p>Primer 2</p>
				<p>Primer 3</p>
				<h2>Segons</h2>
				<p>Segon 1</p>
				<p>Segon 2</p>
				<p>Segon 3</p>
				<h2>Postre o Beguda</h2>
				<button id="demanar">
					<b>Demanar</b>
				</button>
			</div>
		);
	}
}
