import React from 'react';
import './styles/MenuForm.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import OrderDrinks from './OrderDrinks';
import ChangeDate from './ChangeDate';
import OrderBasket from './OrderBasket';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

class MenuForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//State is used for storing data and user inputs
			currentStep: 1,
			// How many menus have been ordered for this day?
			count: 0,
			currDate: this.setDate(),
			//Monday is 1, Friday is 5
			dayOfTheWeek: new Date().getHours() >= 11 ? new Date().getDay() + 1 : new Date().getDay(), // this.setDay()
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
	toPrimerSegonOrder = () => {
		this.setState({
			menuType: 'primerSegon',
			currentStep: 3
		});
	};
	toDosPrimersOrder = () => {
		this.setState({
			menuType: 'dosPrimers',
			currentStep: 3
		});
	};
	toPlatPostresOrder = () => {
		this.setState({
			menuType: 'platPostres',
			currentStep: 3
		});
	};
	handleClick = (e) => {
		if (this.state.currentStep === 1) {
			this.setState({
				currentStep: 2
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
	setDate = () => {
		// new Date().getHours() >= 11 ? new Date().getDay() + 1 : new Date().getDay()
		if (new Date().getHours() >= 11) {
			let tomorrow = new Date();
			return new Date(tomorrow.setDate(new Date().getDate() + 1));
		} else {
			return new Date();
		}
	};
	selectDate = async (e) => {
		// Format date back to readable by JavaScript
		let date = e.target.innerHTML.split(' ')[1];
		let day = date.split('/')[0];
		let month = date.split('/')[1];
		let year = date.split('/')[2];
		let dateOk = new Date(`${month}/${day}/${year}`);

		await this.setState({
			currentStep: 1,
			currDate: dateOk,
			dayOfTheWeek: dateOk.getDay()
		});

		await fetch(`/update-orders?currDate=${this.state.currDate}`).then((res) => res.json()).then((data) => {
			this.setState({
				count: data.count
			});
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
		} else if (this.state.showCheckOut === true) {
			this.setState({
				showCheckOut: false,
				currentStep: 2
			});
		} else {
			this.setState({
				currentStep: this.state.currentStep - 1
			});
		}
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
	setDay = () => {
		let day = new Date().getDay();
		let tomorrow = new Date().getDay() + 1;
		let monday = 1;
		if (day === 6 || day === 0) {
			// If it's Saturday or Sunday
			// 1. Set date to monday
			// 2. Set day to monday
			return monday; // Return Monday
		} else {
			if (new Date().getHours() >= 11) {
				if (tomorrow !== 6 && tomorrow + 1 !== 0) {
					return tomorrow;
				} else {
					return monday;
				}
			} else {
				return day;
			}
		}
	};
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
	validateAddress = () => {
		this.setState({
			currentStep: 'addressValidation',
			showCheckOut: false
		});
	};
	componentDidMount() {
		fetch(`/update-orders?currDate=${this.state.currDate}`).then((res) => res.json()).then((data) => {
			this.setState({
				count: data.count
			});
		});
	}
	render() {
		return (
			<Container id="contentContainer">
				<Row>
					<Col xs={12} md={6}>
						<Button id="toOrderBasket" onClick={this.showCheckOut} />
						<Button id="toHome" onClick={this.props._backToMain} />
						<Step1
							count={this.state.count}
							currentStep={this.state.currentStep}
							dayOfTheWeek={this.state.dayOfTheWeek}
							currDate={this.state.currDate}
							handleClick={this.handleClick}
							changeDate={this.changeDate}
							_backToMain={this.props._backToMain}
						/>
						<Step2
							currentStep={this.state.currentStep}
							handleClick={this.handleClick}
							toPrimerSegonOrder={this.toPrimerSegonOrder}
							toDosPrimersOrder={this.toDosPrimersOrder}
							toPlatPostresOrder={this.toPlatPostresOrder}
							toDrinks={this.toDrinks}
							_back={this._back}
						/>
						<Step3
							currentStep={this.state.currentStep}
							dayOfTheWeek={this.state.dayOfTheWeek}
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
						<ChangeDate
							currentStep={this.state.currentStep}
							changeDate={this.changeDate}
							selectDate={this.selectDate}
							_back={this._back}
						/>
					</Col>
					<Col xs={12}>
						<OrderBasket
							showCheckOut={this.state.showCheckOut}
							menus={this.state.menus}
							cashRegister={this.state.cashRegister}
							drinksOrdered={this.state.drinksOrdered}
							toPayment={this.toPayment}
							validateAddress={this.validateAddress}
							toDrinks={this.toDrinks}
							_back={this._back}
							currDate={this.state.currDate}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default MenuForm;
