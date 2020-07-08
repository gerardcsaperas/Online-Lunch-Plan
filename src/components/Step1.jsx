import React, { useState, useEffect } from 'react';
import './styles/Step1.css';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

//Import menu data from a separate file in order to automatically update UI according to date
import menuOf from './menuData';

class Step1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		// Check for the current step
		if (this.props.currentStep !== 1) {
			return null;
		} else if (this.props.count >= 100) {
			return (
				<Container className="Step1">
					<Row>
						<h1 id="menuTitle">El Menú</h1>
					</Row>
					<Row>
						<h2 className="date">{`${this.props.currDate.getDate()}/${this.props.currDate.getMonth() +
							1}/${this.props.currDate.getFullYear()}`}</h2>
					</Row>
					<hr />
					<Row>
						<h2>Primers</h2>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].primers[0]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].primers[1]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].primers[2]}</p>
					</Row>
					<Row>
						<h2>Segons</h2>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].segons[0]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].segons[1]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].segons[2]}</p>
					</Row>
					<Row>
						<h2>Postres</h2>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].postres[0]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].postres[1]}</p>
					</Row>
					<Col className="text-center">
						<p id="complet">
							<b>Cuina plena!</b> Sentim les molesties.
						</p>
					</Col>
					<Col className="text-center">
						<Button id="changeDate" className="btn" type="button" onClick={this.props.changeDate}>
							Canviar Dia
						</Button>
					</Col>
					<Col className="text-center">
						<Button
							id="backtoMain"
							type="button"
							onClick={this.props._backToMain}
							className="text-center mb-2"
						>
							Enrrere
						</Button>
					</Col>
				</Container>
			);
		} else if (this.props.dayOfTheWeek === 6 || this.props.dayOfTheWeek === 0) {
			return (
				<Container className="Step1">
					<Row>
						<h1 id="menuTitle">El Menú</h1>
					</Row>
					<Row>
						<h2 className="date">{`${this.props.currDate.getDate()}/${this.props.currDate.getMonth() +
							1}/${this.props.currDate.getFullYear()}`}</h2>
					</Row>
					<hr />
					<Row className="text-center m-2">
						<p>
							Els caps de setmana no oferim menú, apreta 'Canviar Dia' per a seleccionar una nova data o
							visita'ns a les nostres tendes!
						</p>
					</Row>
					<Col className="text-center">
						<Button
							id="changeDate"
							type="button"
							onClick={this.props.changeDate}
							className="text-center mb-2"
						>
							Canviar Dia
						</Button>
					</Col>
					<Col className="text-center">
						<Button
							id="backtoMain"
							type="button"
							onClick={this.props._backToMain}
							className="text-center mb-2"
						>
							Enrrere
						</Button>
					</Col>
				</Container>
			);
		} else {
			return (
				<Container className="Step1">
					<Row>
						<h1 id="menuTitle">El Menú</h1>
					</Row>
					<Row>
						<h2 className="date">{`${this.props.currDate.getDate()}/${this.props.currDate.getMonth() +
							1}/${this.props.currDate.getFullYear()}`}</h2>
					</Row>
					<hr />
					<Row>
						<h2>Primers</h2>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].primers[0]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].primers[1]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].primers[2]}</p>
					</Row>
					<Row>
						<h2>Segons</h2>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].segons[0]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].segons[1]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].segons[2]}</p>
					</Row>
					<Row>
						<h2>Postres</h2>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].postres[0]}</p>
					</Row>
					<Row>
						<p>{menuOf[this.props.dayOfTheWeek].postres[1]}</p>
					</Row>
					<Col className="text-center">
						<Button className="btn" id="Demanar" type="button" onClick={this.props.handleClick}>
							Demanar
						</Button>
					</Col>
					<Col className="text-center">
						<Button id="changeDate" className="btn" type="button" onClick={this.props.changeDate}>
							Canviar Dia
						</Button>
					</Col>
					<Col className="text-center">
						<Button
							id="backtoMain"
							type="button"
							onClick={this.props._backToMain}
							className="text-center mb-2"
						>
							Enrrere
						</Button>
					</Col>
				</Container>
			);
		}
	}
}

export default Step1;
