import React from 'react';
import './Step3.css';

class Step3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuType: '',
			primer: '',
			primerA: '',
			primerB: '',
			platUnic: '',
			segon: '',
			postres: ''
		};
	}
	callback = () => {
		console.log(this.state);
	}; //Logs the state in the console
	handleSelection = (e) => {
		let course = e.target.name;
		let dish = e.target.value;

		switch (this.props.menuType) {
			case 'primerSegon':
				if (course === 'primer') {
					this.setState(
						{
							primer: dish
						},
						this.callback
					);
				} else if (course === 'segon') {
					this.setState(
						{
							segon: dish
						},
						this.callback
					);
				} else if (course === 'postres') {
					this.setState(
						{
							postres: dish
						},
						this.callback
					);
				}
				break;
			case 'dosPrimers':
				if (course === 'primerA') {
					this.setState(
						{
							primerA: dish
						},
						this.callback
					);
				} else if (course === 'primerB') {
					this.setState(
						{
							primerB: dish
						},
						this.callback
					);
				} else if (course === 'postres') {
					this.setState(
						{
							postres: dish
						},
						this.callback
					);
				}
				break;
			case 'platPostres':
				if (course === 'platUnic') {
					this.setState(
						{
							platUnic: dish
						},
						this.callback
					);
				} else if (course === 'postres') {
					this.setState(
						{
							postres: dish
						},
						this.callback
					);
				}
				break;
		}
	};
	passToParent = () => {
		let { primer, primerA, primerB, platUnic, segon, postres, menuType } = this.state;
		//Switch to make sure all obligatory radio boxes are filled for every menu type
		switch (menuType) {
			case 'primerSegon':
				if (primer !== '' && segon !== '' && postres !== '') {
					this.props.addAnotherMenu(this.state);
					this.setState({
						primer: '',
						primerA: '',
						primerB: '',
						platUnic: '',
						segon: '',
						postres: ''
					});
				} else {
					alert('És obligatori escollir 1 primer, 1 segon i 1 postre.');
				}
				break;
			case 'dosPrimers':
				if (primerA !== '' && primerB !== '' && postres !== '') {
					this.props.addAnotherMenu(this.state);
					this.setState({
						primer: '',
						primerA: '',
						primerB: '',
						platUnic: '',
						segon: '',
						postres: ''
					});
				} else {
					alert('És obligatori escollir 2 primers i 1 postre.');
				}
				break;
			case 'platPostres':
				if (platUnic !== '' && postres !== '') {
					this.props.addAnotherMenu(this.state);
					this.setState({
						primer: '',
						primerA: '',
						primerB: '',
						platUnic: '',
						segon: '',
						postres: ''
					});
				} else {
					alert('És obligatori escollir 2 primers i 1 postre.');
				}
				break;
		}
	};
	addAnotherMenu = () => {
		this.setState(
			{
				menuType: this.props.menuType
			},
			this.passToParent
		);
	};
	render() {
		if (this.props.currentStep === 3) {
			switch (this.props.menuType) {
				case 'primerSegon':
					return (
						<div className="Step3">
							<h1 className="menuType">Escull els plats</h1>
							<hr />
							<h2>Primers</h2>
							<input
								type="radio"
								id="primer-1"
								name="primer"
								value="primer-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primer-1">Primer 1</label>
							<br />
							<input
								type="radio"
								id="primer-2"
								name="primer"
								value="primer-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primer-2">Primer 2</label>
							<br />
							<input
								type="radio"
								id="primer-3"
								name="primer"
								value="primer-3"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primer-3">Primer 3</label>
							<br />
							<h2>Segons</h2>
							<input
								type="radio"
								id="segon-1"
								name="segon"
								value="segon-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="segon-1">Segon 1</label>
							<br />
							<input
								type="radio"
								id="segon-2"
								name="segon"
								value="segon-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="segon-2">Segon 2</label>
							<br />
							<input
								type="radio"
								id="segon-3"
								name="segon"
								value="segon-3"
								onChange={this.handleSelection}
							/>
							<label htmlFor="segon-3">Segon 3</label>
							<br />
							<h2>Postres</h2>
							<input
								type="radio"
								id="postre-1"
								name="postres"
								value="postre-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="postre-1">Postre 1</label>
							<br />
							<input
								type="radio"
								id="postre-2"
								name="postres"
								value="postre-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="postre-2">Postre 2</label>
							<br />
							<button id="begudes" onClick={this.props.addDrinks}>
								Afegeix begudes
							</button>
							<button id="pay" onClick={this.props.addAndPay}>
								Afegeix i paga
							</button>
							<button id="add-more" onClick={this.addAnotherMenu}>
								Afegeix un altre menú
							</button>
							<button id="back" onClick={this.props._back}>
								Enrrere
							</button>
						</div>
					);
					break;
				case 'dosPrimers':
					return (
						<div className="Step3">
							<h1 className="menuType">Escull els plats</h1>
							<hr />
							<h2>Primer 1</h2>
							<input
								type="radio"
								id="primerA-1"
								name="primerA"
								value="primer-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primerA-r-1">Primer 1</label>
							<br />
							<input
								type="radio"
								id="primerA-2"
								name="primerA"
								value="primer-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primerA-2">Primer 2</label>
							<br />
							<input
								type="radio"
								id="primerA-3"
								name="primerA"
								value="primer-3"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primerA-3">Primer 3</label>
							<br />
							<h2>Primer 2</h2>
							<input
								type="radio"
								id="primerB-1"
								name="primerB"
								value="primer-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primerB-1">Segon 1</label>
							<br />
							<input
								type="radio"
								id="primerB-2"
								name="primerB"
								value="primer-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primerB-2">Segon 2</label>
							<br />
							<input
								type="radio"
								id="primerB-3"
								name="primerB"
								value="primer-3"
								onChange={this.handleSelection}
							/>
							<label htmlFor="primerB-3">Segon 3</label>
							<br />
							<h2>Postres</h2>
							<input
								type="radio"
								id="postre-1"
								name="postres"
								value="postre-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="postre-1">Postre 1</label>
							<br />
							<input
								type="radio"
								id="postre-2"
								name="postres"
								value="postre-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="postre-2">Postre 2</label>
							<button id="begudes" onClick={this.props.addDrinks}>
								Afegeix begudes
							</button>
							<button id="pay" onClick={this.props.addAndPay}>
								Afegeix i paga
							</button>
							<button id="add-more" onClick={this.addAnotherMenu}>
								Afegeix un altre menú
							</button>
							<button id="back" onClick={this.props._back}>
								Enrrere
							</button>
						</div>
					);
					break;
				case 'platPostres':
					return (
						<div className="Step3">
							<h1 className="menuType">Escull els plats</h1>
							<hr />
							<h2>Plat Únic</h2>
							<input
								type="radio"
								id="platUnic-1"
								name="platUnic"
								value="primer-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="platUnic-1">Primer 1</label>
							<br />
							<input
								type="radio"
								id="platUnic-2"
								name="platUnic"
								value="primer-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="platUnic-2">Primer 2</label>
							<br />
							<input
								type="radio"
								id="platUnic-3"
								name="platUnic"
								value="primer-3"
								onChange={this.handleSelection}
							/>
							<label htmlFor="platUnic-3">Primer 3</label>
							<br />
							<input
								type="radio"
								id="platUnic-4"
								name="platUnic"
								value="segon-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="platUnic-4">Segon 1</label>
							<br />
							<input
								type="radio"
								id="platUnic-5"
								name="platUnic"
								value="segon-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="platUnic-5">Segon 2</label>
							<br />
							<input
								type="radio"
								id="platUnic-6"
								name="platUnic"
								value="segon-3"
								onChange={this.handleSelection}
							/>
							<label htmlFor="platUnic-6">Segon 3</label>
							<br />
							<h2>Postres</h2>
							<input
								type="radio"
								id="postre-1"
								name="postres"
								value="postre-1"
								onChange={this.handleSelection}
							/>
							<label htmlFor="postre-1">Postre 1</label>
							<br />
							<input
								type="radio"
								id="postre-2"
								name="postres"
								value="postre-2"
								onChange={this.handleSelection}
							/>
							<label htmlFor="postre-2">Postre 2</label>
							<button id="begudes" onClick={this.props.addDrinks}>
								Afegeix begudes
							</button>
							<button id="pay" onClick={this.props.addAndPay}>
								Afegeix i paga
							</button>
							<button id="add-more" onClick={this.addAnotherMenu}>
								Afegeix un altre menú
							</button>
							<button id="back" onClick={this.props._back}>
								Enrrere
							</button>
						</div>
					);
					break;
				case 'serveiCatering':
					return (
						<div className="Step3">
							<p>Això descarregaria un pdf.</p>
							<button id="back" onClick={this.props._back}>
								Enrrere
							</button>
						</div>
					);
					break;
			}
		} else {
			return null;
		}
	}
}

export default Step3;
