import React from 'react';
import { Link } from 'react-router-dom';
import './styles/DailyMenu.css';
import ShowMenu from './ShowMenu';
import ChooseMenuType from './ChooseMenuType';
import SelectDishes from './SelectDishes';
import OrderDrinks from './OrderDrinks';
import ChangeDate from './ChangeDate';
import OrderBasket from './OrderBasket';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

class DailyMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 'showMenu',
			totalOrdersCount: 0,
			currDate: this.setDate(),
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
	_toPrimerSegonOrder = () => {
		this.setState({
			menuType: 'primerSegon',
			currentStep: 'selectDishes'
		});
	};
	_toDosPrimersOrder = () => {
		this.setState({
			menuType: 'dosPrimers',
			currentStep: 'selectDishes'
		});
	};
	_toPlatPostresOrder = () => {
		this.setState({
			menuType: 'platPostres',
			currentStep: 'selectDishes'
		});
	};
	_toChooseMenuType = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to choose the menu type (or lunch plan)
				they wish to order.
		*/
		this.setState({
			currentStep: 'chooseMenuType'
		});
	};
	_toShowMenu = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user back to see the dishes for the day.
		*/
		this.setState({
			currentStep: 'showMenu'
		});
	};
	_toPayment = (e) => {
		this.setState({
			currentStep: 'payment',
			showCheckOut: false
		});
	};
	_toChangeDate = () => {
		this.setState({
			currentStep: 'changeDate'
		});
	};
	setDate = () => {
		/*
		desc.	If it's past 11AM, render Tomorrow's menu.
				Else, render Today's menu.
		*/
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

		await fetch(`/api/orders?currDate=${this.state.currDate}`).then((res) => res.json()).then((data) => {
			this.setState({
				totalOrdersCount: data.count
			});
		});
	};
	addAnotherMenu = (data) => {
		/*

		*/

		let { menuType, primer, primerA, primerB, platUnic, segon, postres } = data;

		if (menuType === 'primerSegon') {
			this.setState({
				menus: this.state.menus.concat({
					menuType: menuType,
					primer: primer,
					segon: segon,
					postres: postres
				}),
				cashRegister: this.state.cashRegister.concat({
					menuType
				}),
				currentStep: 'chooseMenuType'
			});
		} else if (menuType === 'dosPrimers') {
			this.setState({
				menus: this.state.menus.concat({
					menuType: menuType,
					primerA: primerA,
					primerB: primerB,
					postres: postres
				}),
				cashRegister: this.state.cashRegister.concat({
					menuType
				}),
				currentStep: 'chooseMenuType'
			});
		} else if (menuType === 'platPostres') {
			this.setState({
				menus: this.state.menus.concat({
					menuType: menuType,
					platUnic: platUnic,
					postres: postres
				}),
				cashRegister: this.state.cashRegister.concat({
					menuType
				}),
				currentStep: 'chooseMenuType'
			});
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
			this.setState({
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
			});
		} else if (menuType === 'platPostres') {
			this.setState({
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
			});
		}
	};
	_toOrderDrinks = () => {
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
		fetch(`/api/orders?currDate=${this.state.currDate}`).then((res) => res.json()).then((data) => {
			this.setState({
				totalOrdersCount: data.count
			});
		});
	}
	render() {
		return (
			<Container id="contentContainer">
				<Row>
					<Col xs={12} md={6}>
						<Button id="toOrderBasket" onClick={this.showCheckOut} />
						<Link to="/">
							<Button id="toHome" />
						</Link>
						<ShowMenu
							totalOrdersCount={this.state.totalOrdersCount}
							currentStep={this.state.currentStep}
							dayOfTheWeek={this.state.dayOfTheWeek}
							currDate={this.state.currDate}
							_toChooseMenuType={this._toChooseMenuType}
							_toChangeDate={this._toChangeDate}
							_backToLanding={this.props._backToLanding}
						/>
						<ChooseMenuType
							currentStep={this.state.currentStep}
							_toPrimerSegonOrder={this._toPrimerSegonOrder}
							_toDosPrimersOrder={this._toDosPrimersOrder}
							_toPlatPostresOrder={this._toPlatPostresOrder}
							_toOrderDrinks={this._toOrderDrinks}
							_toShowMenu={this._toShowMenu}
						/>
						<SelectDishes
							currentStep={this.state.currentStep}
							dayOfTheWeek={this.state.dayOfTheWeek}
							menuType={this.state.menuType}
							_toChooseMenuType={this._toChooseMenuType}
							addAnotherMenu={this.addAnotherMenu}
							addAndPay={this.addAndPay}
						/>
						<OrderDrinks
							currentStep={this.state.currentStep}
							_toChooseMenuType={this._toChooseMenuType}
							addDrinksAndPay={this.addDrinksAndPay}
						/>
						<ChangeDate
							currentStep={this.state.currentStep}
							selectDate={this.selectDate}
							_toShowMenu={this._toShowMenu}
						/>
					</Col>
					<Col xs={12}>
						<OrderBasket
							showCheckOut={this.state.showCheckOut}
							menus={this.state.menus}
							cashRegister={this.state.cashRegister}
							drinksOrdered={this.state.drinksOrdered}
							_toPayment={this._toPayment}
							validateAddress={this.validateAddress}
							_toOrderDrinks={this._toOrderDrinks}
							_back={this._back}
							currDate={this.state.currDate}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default DailyMenu;
