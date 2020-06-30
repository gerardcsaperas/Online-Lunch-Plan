import React, { Component } from 'react';
import './Step2.css';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class Step2 extends Component {
	render() {
		//Check for the current step
		if (this.props.currentStep !== 2) {
			return null;
		}
		//The markup for Step2 UI
		return (
			<Container className="Step2">
				<Row>
					<h1 className="menuType">Què busques?</h1>
				</Row>
				<hr />
				<Row>
					<Col xs={12} className="d-flex justify-content-center">
						<Button
							variant="secondary"
							id="primerSegon"
							type="button"
							className="customerNeeds"
							onClick={this.props.handleClick}
						>
							<b>
								Primer, Segon i Postre<br />8,95 €
							</b>
						</Button>
					</Col>
					<Col xs={12} className="d-flex justify-content-center">
						<Button
							variant="secondary"
							id="dosPrimers"
							type="button"
							className="customerNeeds"
							onClick={this.props.handleClick}
						>
							<b>
								2 Primers i Postre<br />7,95 €
							</b>
						</Button>
					</Col>
					<Col xs={12} className="d-flex justify-content-center">
						<Button
							variant="secondary"
							id="platPostres"
							type="button"
							className="customerNeeds"
							onClick={this.props.handleClick}
						>
							<b>
								1 Plat i Postre
								<br />6,95 €
							</b>
						</Button>
					</Col>
					<Col xs={12} className="d-flex justify-content-center">
						<Button
							variant="secondary"
							id="orderDrinks"
							type="button"
							className="customerNeeds"
							onClick={this.props.toDrinks}
						>
							<b>Begudes</b>
						</Button>
					</Col>
				</Row>
				<Row>
					<Button id="back" onClick={this.props._back}>
						Enrrere
					</Button>
				</Row>
			</Container>
		);
	}
}
