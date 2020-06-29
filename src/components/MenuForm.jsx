import React from 'react';
import './MenuForm.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import OrderDrinks from './OrderDrinks';
import ChangeDate from './ChangeDate';
import OrderBasket from './OrderBasket';
import { Container, Row, Col } from 'react-bootstrap';

class MenuForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//State is used for storing data and user inputs
			currentStep: 1,
			currDate: new Date(),
			//Monday is 1, Friday is 5
			dayOfTheWeek: new Date().getDay(),
			menuType: '',
			menus: [],
			cashRegister: [],
			showCheckOut: false,
			drinksOrdered: {
				water: 0,
				cola: 0,
				colaZero: 0,
				beer: 0,
				lemonFanta: 0,
				orangeFanta: 0
			}
		};
	}
	handleSubmit = (e) => {
		e.preventDefault();
	};
	handleChange = (e) => {
		console.log(e.target);
	};
	handleClick = (e) => {
		let buttonId = e.target.id;

		console.log(buttonId);

		if (this.state.currentStep === 1) {
			this.setState({
				currentStep: 2
			});
		} else if (this.state.currentStep === 2) {
			this.setState({
				menuType: buttonId,
				currentStep: 3
			});
		}
	};
	toPayment = (e) => {
		this.setState({
			currentStep: 'payment',
			showCheckOut: false
		});
	};
	changeDate = () => {
		this.setState({
			currentStep: 'changeDate'
		});
	};
	selectDate = (e) => {
		let date = new Date(e.target.innerHTML.split(' ')[1]);
		this.setState({
			currentStep: 1,
			currDate: date,
			dayOfTheWeek: date.getDay()
		});
	};
	_back = (e) => {
		if (this.state.currentStep === 'changeDate') {
			this.setState({
				currentStep: 1
			});
		} else if (this.state.currentStep === 'orderDrinks') {
			this.setState({
				currentStep: 2
			});
		} else if (this.state.currentStep === 1) {
			this.setState({
				showCheckOut: false
			});
		} else {
			this.setState({
				currentStep: this.state.currentStep - 1
			});
		}
	};
	// Console log things asyncronously
	asyncConLog = () => {
		console.log(this.state.menus);
		console.log(this.state.cashRegister);
	};
	addAnotherMenu = (e) => {
		let { menuType } = e;
		// We update the state according to the menu ordered (to avoid clotting component's state)
		if (menuType === 'primerSegon') {
			this.setState({
				menus: this.state.menus.concat({
					//Concatenate the specific dishes.
					menuType: menuType,
					primer: e.primer,
					segon: e.segon,
					postres: e.postres
				}),
				cashRegister: this.state.cashRegister.concat({
					//Concat the menu type.
					menuType
				}),
				currentStep: 2 //Back to menu type selection.
			});
		} else if (menuType === 'dosPrimers') {
			this.setState(
				{
					menus: this.state.menus.concat({
						//Concatenate the specific dishes.
						menuType: menuType,
						primerA: e.primerA,
						primerB: e.primerB,
						postres: e.postres
					}),
					cashRegister: this.state.cashRegister.concat({
						//Concat the menu type.
						menuType
					}),
					currentStep: 2 //Back to menu type selection.
				},
				this.asyncConLog
			);
		} else if (menuType === 'platPostres') {
			this.setState(
				{
					menus: this.state.menus.concat({
						// Concatenate the specific dishes.
						menuType: menuType,
						platUnic: e.platUnic,
						postres: e.postres
					}),
					cashRegister: this.state.cashRegister.concat({
						// Concat the menu type.
						menuType
					}),
					currentStep: 2 //Back to menu type selection.
				},
				this.asyncConLog
			);
		}
	};
	addAndPay = (e) => {
		let { menuType } = e;
		// We update the state according to the menu ordered (to avoid clotting component's state)
		if (menuType === 'primerSegon') {
			this.setState({
				menus: this.state.menus.concat({
					// Concatenate the specific dishes.
					menuType: menuType,
					primer: e.primer,
					segon: e.segon,
					postres: e.postres
				}),
				cashRegister: this.state.cashRegister.concat({
					// Concat the menu type.
					menuType
				}),
				currentStep: 1,
				showCheckOut: true // Order review and checkout screen
			});
		} else if (menuType === 'dosPrimers') {
			this.setState(
				{
					menus: this.state.menus.concat({
						//Concatenate the specific dishes.
						menuType: menuType,
						primerA: e.primerA,
						primerB: e.primerB,
						postres: e.postres
					}),
					cashRegister: this.state.cashRegister.concat({
						//Concat the menu type.
						menuType
					}),
					currentStep: 1,
					showCheckOut: true // Order review and checkout screen
				},
				this.asyncConLog
			);
		} else if (menuType === 'platPostres') {
			this.setState(
				{
					menus: this.state.menus.concat({
						// Concatenate the specific dishes.
						menuType: menuType,
						platUnic: e.platUnic,
						postres: e.postres
					}),
					cashRegister: this.state.cashRegister.concat({
						// Concat the menu type.
						menuType
					}),
					currentStep: 1,
					showCheckOut: true // Order review and checkout screen
				},
				this.asyncConLog
			);
		}
	};
	toDrinks = () => {
		this.setState({
			currentStep: 'orderDrinks',
			showCheckOut: false
		});
	};
	addDrinksAndPay = async (e) => {
		let { water, cola, colaZero, beer, lemonFanta, orangeFanta } = e;
		await this.setState({
			drinksOrdered: {
				water,
				cola,
				colaZero,
				beer,
				lemonFanta,
				orangeFanta
			},
			currentStep: 1,
			showCheckOut: true // Order review and checkout screen
		});
	};
	addDrinksAndContinue = (e) => {};
	showCheckOut = () => {
		let { showCheckOut } = this.state;

		if (showCheckOut) {
			this.setState({
				showCheckOut: false
			});
		} else {
			this.setState({
				showCheckOut: true
			});
		}
	};
	render() {
		return (
			<Container id="contentContainer">
				<Row>
					<Col xs={12} md={6}>
						{/*<form className="MenuForm" onSubmit={this.handleSubmit}>*/}
						<Step1
							currentStep={this.state.currentStep}
							dayOfTheWeek={this.state.dayOfTheWeek}
							currDate={this.state.currDate}
							handleClick={this.handleClick}
							changeDate={this.changeDate}
						/>
						<Step2
							currentStep={this.state.currentStep}
							handleClick={this.handleClick}
							toDrinks={this.toDrinks}
							_back={this._back}
						/>
						<Step3
							currentStep={this.state.currentStep}
							dayOfTheWeek={this.state.dayOfTheWeek}
							handleChange={this.handleChange}
							menuType={this.state.menuType}
							_back={this._back}
							addAnotherMenu={this.addAnotherMenu}
							addAndPay={this.addAndPay}
						/>
						<OrderDrinks
							currentStep={this.state.currentStep}
							_back={this._back}
							addDrinksAndPay={this.addDrinksAndPay}
						/>
						<OrderBasket
							showHide={this.showCheckOut}
							showCheckOut={this.state.showCheckOut}
							menus={this.state.menus}
							cashRegister={this.state.cashRegister}
							drinksOrdered={this.state.drinksOrdered}
							toPayment={this.toPayment}
							toDrinks={this.toDrinks}
							_back={this._back}
						/>
						<ChangeDate
							currentStep={this.state.currentStep}
							changeDate={this.changeDate}
							selectDate={this.selectDate}
						/>
						{/*</form>*/}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default MenuForm;