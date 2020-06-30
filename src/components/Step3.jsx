import React from 'react';
import './Step3.css';

// Import menu data from a separate file in order to automatically update UI according to date
import menuOf from './menuData';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

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
	consoleLogCallback = () => {
		console.log(this.state);
	}; //Logs the state in the console
	handleSelection = (e) => {
		let course = e.target.name;
		let dish = e.target.value;

		switch (this.props.menuType) {
			default:
				console.log('You got a problem @line 26, Step3.js');
				break;
			case 'primerSegon':
				if (course === 'primer') {
					this.setState({
						primer: dish
					});
				} else if (course === 'segon') {
					this.setState({
						segon: dish
					});
				} else if (course === 'postres') {
					this.setState({
						postres: dish
					});
				}
				break;
			case 'dosPrimers':
				if (course === 'primerA') {
					this.setState({
						primerA: dish
					});
				} else if (course === 'primerB') {
					this.setState({
						primerB: dish
					});
				} else if (course === 'postres') {
					this.setState({
						postres: dish
					});
				}
				break;
			case 'platPostres':
				if (course === 'platUnic') {
					this.setState({
						platUnic: dish
					});
				} else if (course === 'postres') {
					this.setState({
						postres: dish
					});
				}
				break;
		}
	};
	addAndPay = () => {
		this.setState(
			{
				menuType: this.props.menuType
			},
			this.passToParentAndPay // Pass data to parent component and go to order review and checkout
		);
	};
	passToParentAndPay = () => {
		let { primer, primerA, primerB, platUnic, segon, postres, menuType } = this.state;
		// Switch to make sure all obligatory radio boxes are filled for every menu type.
		switch (menuType) {
			default:
				console.log('You got a problem @ line 96, Step3.js');
				break;
			case 'primerSegon':
				if (primer !== '' && segon !== '' && postres !== '') {
					this.props.addAndPay(this.state); // Call to the function passed by the parent with Step3's state as arguments.
					this.setState({
						// Clear state for future use.
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
					this.props.addAndPay(this.state); // Call to the function passed by the parent with Step3's state as arguments.
					this.setState({
						// Clear state for future use.
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
					this.props.addAndPay(this.state); //Call to the function passed by the parent with Step3's state as arguments.
					this.setState({
						//Clear state for future use.
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
			this.passToParent // Pass data to parent component
		);
	};
	passToParent = () => {
		let { primer, primerA, primerB, platUnic, segon, postres, menuType } = this.state;
		// Switch to make sure all obligatory radio boxes are filled for every menu type.
		switch (menuType) {
			default:
				console.log('You got a problem @ line 96, Step3.js');
				break;
			case 'primerSegon':
				if (primer !== '' && segon !== '' && postres !== '') {
					this.props.addAnotherMenu(this.state); // Call to the function passed by the parent with Step3's state as arguments.
					this.setState({
						// Clear state for future use.
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
					this.props.addAnotherMenu(this.state); // Call to the function passed by the parent with Step3's state as arguments.
					this.setState({
						// Clear state for future use.
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
					this.props.addAnotherMenu(this.state); //Call to the function passed by the parent with Step3's state as arguments.
					this.setState({
						//Clear state for future use.
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
	render() {
		let dayOfTheWeek = this.props.dayOfTheWeek;

		if (this.props.currentStep === 3) {
			switch (this.props.menuType) {
				default:
					return null;
				case 'primerSegon':
					if (dayOfTheWeek === 6 || dayOfTheWeek === 0) {
						// Case for weekends, return next Monday
						return (
							<Container className="Step3">
								<h1 className="menuType">Escull els plats</h1>
								<hr />
								<h2>Primers</h2>
								<input
									className="radio"
									type="radio"
									id="primer-1"
									name="primer"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primer-1">{menuOf[1].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primer-2"
									name="primer"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primer-2">{menuOf[1].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primer-3"
									name="primer"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primer-3">{menuOf[1].primers[2]}</label>
								<br />
								<h2>Segons</h2>
								<input
									className="radio"
									type="radio"
									id="segon-1"
									name="segon"
									value="segon-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="segon-1">{menuOf[1].segons[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="segon-2"
									name="segon"
									value="segon-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="segon-2">{menuOf[1].segons[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="segon-3"
									name="segon"
									value="segon-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="segon-3">{menuOf[1].segons[2]}</label>
								<br />
								<h2>Postres</h2>
								<input
									className="radio"
									type="radio"
									id="postre-1"
									name="postres"
									value="postre-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-1">{menuOf[1].postres[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="postre-2"
									name="postres"
									value="postre-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-2">{menuOf[1].postres[1]}</label>
								<br />
								<Row className="d-flex flex-column">
									<Button id="pay" onClick={this.addAndPay}>
										Afegeix i paga
									</Button>
									<Button id="add-more" onClick={this.addAnotherMenu}>
										Afegeix i segueix comprant
									</Button>
									<Button id="back" onClick={this.props._back}>
										Enrrere
									</Button>
								</Row>
							</Container>
						);
					} else {
						return (
							<Container className="Step3">
								<h1 className="menuType">Escull els plats</h1>
								<hr />
								<h2>Primers</h2>
								<input
									className="radio"
									type="radio"
									id="primer-1"
									name="primer"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primer-1">{menuOf[dayOfTheWeek].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primer-2"
									name="primer"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primer-2">{menuOf[dayOfTheWeek].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primer-3"
									name="primer"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primer-3">{menuOf[dayOfTheWeek].primers[2]}</label>
								<br />
								<h2>Segons</h2>
								<input
									className="radio"
									type="radio"
									id="segon-1"
									name="segon"
									value="segon-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="segon-1">{menuOf[dayOfTheWeek].segons[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="segon-2"
									name="segon"
									value="segon-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="segon-2">{menuOf[dayOfTheWeek].segons[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="segon-3"
									name="segon"
									value="segon-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="segon-3">{menuOf[dayOfTheWeek].segons[2]}</label>
								<br />
								<h2>Postres</h2>
								<input
									className="radio"
									type="radio"
									id="postre-1"
									name="postres"
									value="postre-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-1">{menuOf[dayOfTheWeek].postres[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="postre-2"
									name="postres"
									value="postre-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-2">{menuOf[dayOfTheWeek].postres[1]}</label>
								<Row className="d-flex flex-column">
									<Button className="btn" id="pay" onClick={this.addAndPay}>
										Afegeix i paga
									</Button>
									<Button className="btn" id="add-more" onClick={this.addAnotherMenu}>
										Afegeix i segueix comprant
									</Button>
									<Button className="btn" id="back" onClick={this.props._back}>
										Enrrere
									</Button>
								</Row>
							</Container>
						);
					}

				case 'dosPrimers':
					if (dayOfTheWeek === 6 || dayOfTheWeek === 0) {
						// Case for weekends, return next Monday
						return (
							<Container className="Step3">
								<h1 className="menuType">Escull els plats</h1>
								<hr />
								<h2>Primer 1</h2>
								<input
									className="radio"
									type="radio"
									id="primerA-1"
									name="primerA"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerA-1">{menuOf[1].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerA-2"
									name="primerA"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerA-2">{menuOf[1].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerA-3"
									name="primerA"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerA-3">{menuOf[1].primers[2]}</label>
								<br />
								<h2>Primer 2</h2>
								<input
									className="radio"
									type="radio"
									id="primerB-1"
									name="primerB"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerB-1">{menuOf[1].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerB-2"
									name="primerB"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerB-2">{menuOf[1].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerB-3"
									name="primerB"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerB-3">{menuOf[1].primers[2]}</label>
								<br />
								<h2>Postres</h2>
								<input
									className="radio"
									type="radio"
									id="postre-1"
									name="postres"
									value="postre-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-1">{menuOf[1].postres[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="postre-2"
									name="postres"
									value="postre-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-2">{menuOf[1].postres[1]}</label>
								<Row className="d-flex flex-column">
									<Button id="pay" onClick={this.addAndPay}>
										Afegeix i paga
									</Button>
									<Button id="add-more" onClick={this.addAnotherMenu}>
										Afegeix i segueix comprant
									</Button>
									<Button id="back" onClick={this.props._back}>
										Enrrere
									</Button>
								</Row>
							</Container>
						);
					} else {
						return (
							<Container className="Step3">
								<h1 className="menuType">Escull els plats</h1>
								<hr />
								<h2>Primer 1</h2>
								<input
									className="radio"
									type="radio"
									id="primerA-1"
									name="primerA"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerA-1">{menuOf[dayOfTheWeek].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerA-2"
									name="primerA"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerA-2">{menuOf[dayOfTheWeek].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerA-3"
									name="primerA"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerA-3">{menuOf[dayOfTheWeek].primers[2]}</label>
								<br />
								<h2>Primer 2</h2>
								<input
									className="radio"
									type="radio"
									id="primerB-1"
									name="primerB"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerB-1">{menuOf[dayOfTheWeek].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerB-2"
									name="primerB"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerB-2">{menuOf[dayOfTheWeek].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="primerB-3"
									name="primerB"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="primerB-3">{menuOf[dayOfTheWeek].primers[2]}</label>
								<br />
								<h2>Postres</h2>
								<input
									className="radio"
									type="radio"
									id="postre-1"
									name="postres"
									value="postre-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-1">{menuOf[dayOfTheWeek].postres[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="postre-2"
									name="postres"
									value="postre-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-2">{menuOf[dayOfTheWeek].postres[1]}</label>
								<Row className="d-flex flex-column">
									<Button id="pay" onClick={this.addAndPay}>
										Afegeix i paga
									</Button>
									<Button id="add-more" onClick={this.addAnotherMenu}>
										Afegeix i segueix comprant
									</Button>
									<Button id="back" onClick={this.props._back}>
										Enrrere
									</Button>
								</Row>
							</Container>
						);
					}
				case 'platPostres':
					if (dayOfTheWeek === 6 || dayOfTheWeek === 0) {
						return (
							<Container className="Step3">
								<h1 className="menuType">Escull els plats</h1>
								<hr />
								<h2>Plat Únic</h2>
								<input
									className="radio"
									type="radio"
									id="platUnic-1"
									name="platUnic"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-1">{menuOf[1].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-2"
									name="platUnic"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-2">{menuOf[1].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-3"
									name="platUnic"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-3">{menuOf[1].primers[2]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-4"
									name="platUnic"
									value="segon-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-4">{menuOf[1].segons[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-5"
									name="platUnic"
									value="segon-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-5">{menuOf[1].segons[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-6"
									name="platUnic"
									value="segon-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-6">{menuOf[1].segons[2]}</label>
								<br />
								<h2>Postres</h2>
								<input
									className="radio"
									type="radio"
									id="postre-1"
									name="postres"
									value="postre-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-1">{menuOf[1].postres[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="postre-2"
									name="postres"
									value="postre-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-2">{menuOf[1].postres[1]}</label>
								<Row className="d-flex flex-column">
									<Button id="pay" onClick={this.addAndPay}>
										Afegeix i paga
									</Button>
									<Button id="add-more" onClick={this.addAnotherMenu}>
										Afegeix i segueix comprant
									</Button>
									<Button id="back" onClick={this.props._back}>
										Enrrere
									</Button>
								</Row>
							</Container>
						);
					} else {
						return (
							<Container className="Step3">
								<h1 className="menuType">Escull els plats</h1>
								<hr />
								<h2>Plat Únic</h2>
								<input
									className="radio"
									type="radio"
									id="platUnic-1"
									name="platUnic"
									value="primer-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-1">{menuOf[dayOfTheWeek].primers[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-2"
									name="platUnic"
									value="primer-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-2">{menuOf[dayOfTheWeek].primers[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-3"
									name="platUnic"
									value="primer-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-3">{menuOf[dayOfTheWeek].primers[2]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-4"
									name="platUnic"
									value="segon-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-4">{menuOf[dayOfTheWeek].segons[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-5"
									name="platUnic"
									value="segon-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-5">{menuOf[dayOfTheWeek].segons[1]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="platUnic-6"
									name="platUnic"
									value="segon-3"
									onChange={this.handleSelection}
								/>
								<label htmlFor="platUnic-6">{menuOf[dayOfTheWeek].segons[2]}</label>
								<br />
								<h2>Postres</h2>
								<input
									className="radio"
									type="radio"
									id="postre-1"
									name="postres"
									value="postre-1"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-1">{menuOf[dayOfTheWeek].postres[0]}</label>
								<br />
								<input
									className="radio"
									type="radio"
									id="postre-2"
									name="postres"
									value="postre-2"
									onChange={this.handleSelection}
								/>
								<label htmlFor="postre-2">{menuOf[dayOfTheWeek].postres[1]}</label>
								<Row className="d-flex flex-column">
									<Button id="pay" onClick={this.addAndPay}>
										Afegeix i paga
									</Button>
									<Button id="add-more" onClick={this.addAnotherMenu}>
										Afegeix i segueix comprant
									</Button>
									<Button id="back" onClick={this.props._back}>
										Enrrere
									</Button>
								</Row>
							</Container>
						);
					}
			}
		} else {
			return null;
		}
	}
}

export default Step3;
