import React from 'react';
import './styles/ChooseMenuType.css';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function ChooseMenuType(props) {
	if (props.currentStep !== 'chooseMenuType') {
		return null;
	} else {
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
							onClick={props._toPrimerSegonOrder}
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
							onClick={props._toDosPrimersOrder}
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
							onClick={props._toPlatPostresOrder}
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
							onClick={props._toOrderDrinks}
						>
							<b>Begudes</b>
						</Button>
					</Col>
				</Row>
				<Row>
					<Button id="back" onClick={props._toShowMenu}>
						Enrrere
					</Button>
				</Row>
			</Container>
		);
	}
}
