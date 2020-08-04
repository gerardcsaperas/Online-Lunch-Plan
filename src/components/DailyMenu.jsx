import React, { Fragment } from 'react';
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
			showOrderBasket: false,
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
	_toDosPrimersOrder = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to select the dishes of choice
				for the two-starters lunch plan.

				In catalan, 'Primers' stands for Starters.
		*/
		this.setState({
			menuType: 'dosPrimers',
			currentStep: 'selectDishes'
		});
	};
	_toPlatPostresOrder = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to select the dishes of choice
				for the half lunch plan.

				In catalan, 'Plat' stands for Dish. 'Postres'
				stands for Desserts.
		*/
		this.setState({
			menuType: 'platPostres',
			currentStep: 'selectDishes'
		});
	};
	_toPrimerSegonOrder = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to select the dishes of choice
				for the full lunch plan.

				In catalan, 'Primer' stands for Starter. 'Segon'
				stands for Main Course.
		*/
		this.setState({
			menuType: 'primerSegon',
			currentStep: 'selectDishes'
		});
	};
	_toChangeDate = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to date selection menu.
				The menu goes from Monday to Friday.
		*/
		this.setState({
			currentStep: 'changeDate'
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
	_toOrderBasket = () => {
		let { showOrderBasket } = this.state;

		if (showOrderBasket) {
			this.setState({
				showOrderBasket: false
			});
		} else {
			this.setState({
				showOrderBasket: true
			});
		}
	};
	_toOrderDrinks = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to the drinks menu.
		*/
		this.setState({
			currentStep: 'orderDrinks',
			showOrderBasket: false
		});
	};
	_toPayment = (e) => {
		/*		
		type	NAVIGATION
		desc.	Takes the user to the drinks menu.
		*/
		this.setState({
			currentStep: 'payment',
			showOrderBasket: false
		});
	};
	_toShowMenu = () => {
		/*		
		type	NAVIGATION
		desc.	Takes the user back to see the dishes for the day.
		*/
		this.setState({
			currentStep: 'showMenu',
			showOrderBasket: false
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
		/*		
		type	STATE MODIFIER -> DATE
		desc.	Sets the date the user selected and then
				goes back to <ShowMenu /> screen.
		*/
		let date = e.target.innerHTML.split(' ')[1];
		let day = date.split('/')[0];
		let month = date.split('/')[1];
		let year = date.split('/')[2];
		let dateOk = new Date(`${month}/${day}/${year}`);

		await this.setState({
			currentStep: 'showMenu',
			currDate: dateOk,
			dayOfTheWeek: dateOk.getDay()
		});

		await fetch(`/api/orders?currDate=${this.state.currDate}`).then((res) => res.json()).then((data) => {
			this.setState({
				totalOrdersCount: data.count
			});
		});
	};
	addAnotherMenu = (dishes, menuType) => {
		/*
		type	STATE MODIFIER -> ORDER (FOOD)
		desc.	Sets the menu type ordered, and the dishes
				ordered for every menu.

				Everything is concatenated into potential
				previously ordered menus.

				Once the user is finished, take them back 
				to the screen where they can select menu type.
		*/

		let { primer, primerA, primerB, platUnic, segon, postres } = dishes;

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
	addAndPay = (dishes, menuType) => {
		/*
		type	STATE MODIFIER -> ORDER (FOOD)
		desc.	Sets the menu type ordered, and the dishes
				ordered for every menu.

				Everything is concatenated into potential
				previously ordered menus.

				Once the user is finished, take them to
				their order basket to review and proceed
				to payment.
		*/
		const { primer, primerA, primerB, platUnic, segon, postres } = dishes;
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
				currentStep: 'showMenu',
				showOrderBasket: true
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
				currentStep: 'showMenu',
				showOrderBasket: true
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
				currentStep: 'showMenu',
				showOrderBasket: true
			});
		}
	};

	addDrinksAndPay = async (drinks) => {
		/*
		type	STATE MODIFIER -> ORDER (DRINKS)
		desc.	Let the user add and remove drinks. 
				Never go below 0.

				Once the user is finished, take them to
				their order basket to review and proceed
				to payment.
		*/
		let { water, cola, colaZero, beer, lemonFanta, orangeFanta } = drinks;
		await this.setState({
			drinksOrdered: {
				water,
				cola,
				colaZero,
				beer,
				lemonFanta,
				orangeFanta
			},
			currentStep: 'showMenu',
			showOrderBasket: true // Order review and checkout screen
		});
	};
	setDay = () => {
		/*
		type	UTILITY
		desc.	Retrieve the day of the week (number)
				in order for JavaScript to be able to
				show the daily menu accordingly.
		*/
		let day = new Date().getDay();
		let tomorrow = new Date().getDay() + 1;
		let monday = 1;
		if (day === 6 || day === 0) {
			return monday;
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
	componentDidMount() {
		fetch(`/api/orders?currDate=${this.state.currDate}`).then((res) => res.json()).then((data) => {
			this.setState({
				totalOrdersCount: data.count
			});
		});
	}
	render() {
		return (
			<Fragment>
				<div id="backgroundWrap" />
				<Container id="contentContainer">
					<Row>
						<Col xs={12} md={6}>
							<Button id="toOrderBasket" onClick={this._toOrderBasket} />
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
								currDate={this.state.currDate}
								showOrderBasket={this.state.showOrderBasket}
								menus={this.state.menus}
								cashRegister={this.state.cashRegister}
								drinksOrdered={this.state.drinksOrdered}
								_toPayment={this._toPayment}
								_toDeliveryAddress={this._toDeliveryAddress}
								_toOrderDrinks={this._toOrderDrinks}
								_toShowMenu={this._toShowMenu}
							/>
						</Col>
					</Row>
				</Container>
			</Fragment>
		);
	}
}

export default DailyMenu;
