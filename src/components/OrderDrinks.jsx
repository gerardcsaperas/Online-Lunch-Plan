import React, { Component } from 'react';
import './OrderDrinks.css';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

/*
Aigua 1,00€
Cocacola 1,30€
Cocacola zero 1,30€
Cervessa estrella 1,50€
Fanta de llimona 1,30€
Fanta taronja 1,30€
*/

export class OrderDrinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			water: 0,
			cola: 0,
			colaZero: 0,
			beer: 0,
			lemonFanta: 0,
			orangeFanta: 0
		};
	}
	moreDrinks = (e) => {
		const name = e.target.name;
		switch (name) {
			default:
				console.log(`There has been an error with your function in @line 29, OrderDrinks.jsx`);
				break;
			case 'water':
				this.setState({
					water: this.state.water + 1
				});
				break;
			case 'cola':
				this.setState({
					cola: this.state.cola + 1
				});
				break;
			case 'colaZero':
				this.setState({
					colaZero: this.state.colaZero + 1
				});
				break;
			case 'beer':
				this.setState({
					beer: this.state.beer + 1
				});
				break;
			case 'lemonFanta':
				this.setState({
					lemonFanta: this.state.lemonFanta + 1
				});
				break;
			case 'orangeFanta':
				this.setState({
					orangeFanta: this.state.orangeFanta + 1
				});
				break;
		}
	};
	lessDrinks = (e) => {
		const name = e.target.name;
		switch (name) {
			default:
				console.log(`There has been an error with your function in @line 29, OrderDrinks.jsx`);
				break;
			case 'water':
				if (this.state.water > 0) {
					this.setState({
						water: this.state.water - 1
					});
				}
				break;
			case 'cola':
				if (this.state.cola > 0) {
					this.setState({
						cola: this.state.cola - 1
					});
				}
				break;
			case 'colaZero':
				if (this.state.colaZero > 0) {
					this.setState({
						colaZero: this.state.colaZero - 1
					});
				}
				break;
			case 'beer':
				if (this.state.beer > 0) {
					this.setState({
						beer: this.state.beer - 1
					});
				}
				break;
			case 'lemonFanta':
				if (this.state.lemonFanta > 0) {
					this.setState({
						lemonFanta: this.state.lemonFanta - 1
					});
				}
				break;
			case 'orangeFanta':
				if (this.state.orangeFanta > 0) {
					this.setState({
						orangeFanta: this.state.orangeFanta - 1
					});
				}
				break;
		}
	};
	updateDrinks = (e) => {
		console.log(e.target);
	};
	addDrinksAndPay = () => {
		// This won't clear component's state. The number of drinks will be saved.
		this.props.addDrinksAndPay(this.state);
	};
	render() {
		if (this.props.currentStep === 'orderDrinks') {
			return (
				<Container className="OrderDrinks">
					<h1>Begudes</h1>
					<Row className="drinks-row">
						<Col xs={6}>
							<label className="drinks-label" htmlFor="aigua">
								Aigua 1,00€
							</label>
						</Col>
						<Col xs={3}>
							<input
								className="counter"
								type="text"
								name="water"
								id="water"
								value={this.state.water}
								readOnly
							/>
						</Col>
						<Col xs={3}>
							<button className="moreDrinks" onClick={this.moreDrinks} name="water" />
							<button className="lessDrinks" onClick={this.lessDrinks} name="water" />
						</Col>
					</Row>
					<Row className="drinks-row">
						<Col xs={6}>
							<label className="drinks-label" htmlFor="cola">
								Coca-Cola 1,30€
							</label>
						</Col>
						<Col xs={3}>
							<input
								className="counter"
								type="text"
								name="cola"
								id="cola"
								value={this.state.cola}
								readOnly
							/>
						</Col>
						<Col xs={3}>
							<button className="moreDrinks" onClick={this.moreDrinks} name="cola" />
							<button className="lessDrinks" onClick={this.lessDrinks} name="cola" />
						</Col>
					</Row>
					<Row className="drinks-row">
						<Col xs={6}>
							<label className="drinks-label" htmlFor="colaZero">
								Coca-Cola Zero 1,30€
							</label>
						</Col>
						<Col xs={3}>
							<input
								className="counter"
								type="text"
								name="colaZero"
								id="colaZero"
								value={this.state.colaZero}
								readOnly
							/>
						</Col>
						<Col xs={3}>
							<button className="moreDrinks" onClick={this.moreDrinks} name="colaZero" />
							<button className="lessDrinks" onClick={this.lessDrinks} name="colaZero" />
						</Col>
					</Row>
					<Row className="drinks-row">
						<Col xs={6}>
							<label className="drinks-label" htmlFor="beer">
								Estrella Damm 1,50€
							</label>
						</Col>
						<Col xs={3}>
							<input
								className="counter"
								type="text"
								name="beer"
								id="beer"
								value={this.state.beer}
								readOnly
							/>
						</Col>
						<Col xs={3}>
							<button className="moreDrinks" onClick={this.moreDrinks} name="beer" />
							<button className="lessDrinks" onClick={this.lessDrinks} name="beer" />
						</Col>
					</Row>
					<Row className="drinks-row">
						<Col xs={6}>
							<label className="drinks-label" htmlFor="lemonFanta">
								Fanta Llimona 1,30€
							</label>
						</Col>
						<Col xs={3}>
							<input
								className="counter"
								type="text"
								name="lemonFanta"
								id="lemonFanta"
								value={this.state.lemonFanta}
								readOnly
							/>
						</Col>
						<Col xs={3}>
							<button className="moreDrinks" onClick={this.moreDrinks} name="lemonFanta" />
							<button className="lessDrinks" onClick={this.lessDrinks} name="lemonFanta" />
						</Col>
					</Row>
					<Row className="drinks-row">
						<Col xs={6}>
							<label className="drinks-label" htmlFor="orangeFanta">
								Fanta Taronja 1,30€
							</label>
						</Col>
						<Col xs={3}>
							<input
								className="counter"
								type="text"
								name="orangeFanta"
								id="orangeFanta"
								value={this.state.orangeFanta}
								readOnly
							/>
						</Col>
						<Col xs={3}>
							<button className="moreDrinks" onClick={this.moreDrinks} name="orangeFanta" />
							<button className="lessDrinks" onClick={this.lessDrinks} name="orangeFanta" />
						</Col>
					</Row>
					<Row>
						<Button id="addAndPay" variant="success" onClick={this.addDrinksAndPay}>
							Afegeix Begudes i Paga
						</Button>
					</Row>
					<Row>
						<Button id="back" onClick={this.props._back}>
							Enrrere
						</Button>
					</Row>
				</Container>
			);
		} else {
			return null;
		}
	}
}

export default OrderDrinks;
