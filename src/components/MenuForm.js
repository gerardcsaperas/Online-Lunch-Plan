import React from 'react';
import './MenuForm.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import ChangeDate from './ChangeDate';
import CheckOut from './CheckOut';

class MenuForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//State is used for storing data and user inputs
			currentStep: 1,
			currDate: new Date(),
			menuType: '',
			menus: [],
			cashRegister: [],
			showCheckOut: false
		};
	}
	orderButton = () => {
		let { currentStep } = this.state;
		if (currentStep === 1) {
			return (
				<button id="Demanar" type="button" onClick={this.handleClick}>
					Demanar
				</button>
			);
		} else {
			return null;
		}
	};
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
	changeDate = (e) => {
		this.setState({
			currentStep: 0
		});
	};
	selectDate = (e) => {
		let date = new Date(e.target.innerHTML.split(' ')[1]);
		console.log(date);
		this.setState({
			currentStep: 1,
			currDate: date
		});
	};
	_back = (e) => {
		this.setState({
			currentStep: this.state.currentStep - 1
		});
	};
	asyncConLog = () => {
		console.log(this.state.menus);
		console.log(this.state.cashRegister);
	};
	addAnotherMenu = (e) => {
		let { menuType } = e;
		//We update the state according to the menu ordered (to avoid clotting component's state)
		if (menuType === 'primerSegon') {
			this.setState(
				{
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
				},
				this.asyncConLog
			);
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
						//Concatenate the specific dishes.
						menuType: menuType,
						platUnic: e.platUnic,
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
		}
	};
	addAndPay = (e) => {};
	addDrinks = (e) => {};
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
	/*checkOutChildren = () => {
		let primerSegonCount = 0;
		let dosPrimersCount = 0;
		let platPostresCount = 0;

		const menuData = [
			{
				menuType: 'Menú Complet',
				count: primerSegonCount,
				price: 8.95
			},
			{
				menuType: 'Menú 2 Primers',
				count: dosPrimersCount,
				price: 7.95
			},
			{
				menuType: 'Mig Menú',
				count: platPostresCount,
				price: 6.95
			}
		];

		for (let i of this.state.cashRegister) {
			switch (i) {
				case 'primerSegon':
					primerSegonCount++;
					break;
				case 'dosPrimers':
					dosPrimersCount++;
					break;
				case 'platPostres':
					platPostresCount++;
					break;
			}
		}

		for (let ele of menuData) {
			//if (ele.count > 0) {
			return (
				<div id="checkout-row">
					<div id="description-row">
						<p>
							<b>Descripció</b>
						</p>
						<p>
							<b>Quant.</b>
						</p>
						<p>
							<b>€/Unitat</b>
						</p>
					</div>
					<hr />
					<div id="checkout-elements">
						<p>{ele.menuType}</p>
						<p>{ele.count}</p>
						<p>{`${ele.price} €`}</p>
						<p>{`${ele.count * ele.price} €`}</p>
					</div>
				</div>
			);
			//}
		}
	};*/
	render() {
		return (
			<section>
				<form className="MenuForm" onSubmit={this.handleSubmit}>
					<Step1 currentStep={this.state.currentStep} />
					<Step2 currentStep={this.state.currentStep} handleClick={this.handleClick} />
					<Step3
						currentStep={this.state.currentStep}
						handleChange={this.handleChange}
						menuType={this.state.menuType}
						_back={this._back}
						addAnotherMenu={this.addAnotherMenu}
						addAndPay={this.addAndPay}
						addDrinks={this.addDrinks}
					/>
					{this.orderButton()} {/*Only shows if step is 1 */}
					<CheckOut
						showHide={this.showCheckOut}
						showCheckOut={this.state.showCheckOut}
						menus={this.state.menus}
						cashRegister={this.state.cashRegister}
					/>
					<ChangeDate
						currentStep={this.state.currentStep}
						changeDate={this.changeDate}
						selectDate={this.selectDate}
					/>
				</form>
			</section>
		);
	}
}

export default MenuForm;
