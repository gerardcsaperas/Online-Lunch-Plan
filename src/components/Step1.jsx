import React from 'react';
import './Step1.css';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

//Import menu data from a separate file in order to automatically update UI according to date
import menuOf from './menuData';

const Step1 = (props) => {
	let dayOfTheWeek = props.dayOfTheWeek;

	// Check for the current step
	if (props.currentStep !== 1) {
		return null;
	} else if (dayOfTheWeek === 6 || dayOfTheWeek === 0) {
		return (
			<Container className="Step1">
				<Row>
					<h1 id="menuTitle">El Menú</h1>
				</Row>
				<Row>
					<h2 className="date">{`${props.currDate.getDate()}/${props.currDate.getMonth() +
						1}/${props.currDate.getFullYear()}`}</h2>
				</Row>
				<hr />
				<Row className="text-center m-2">
					<p>
						Els caps de setmana no oferim menú, apreta 'Canviar Dia' per a seleccionar una nova data o
						visita'ns a les nostres tendes!
					</p>
				</Row>
				<Col className="text-center">
					<Button id="changeDate" type="button" onClick={props.changeDate} className="text-center mb-2">
						Canviar Dia
					</Button>
				</Col>
				<Col className="text-center">
					<Button id="backtoMain" type="button" onClick={props._backToMain} className="text-center mb-2">
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
					<h2 className="date">{`${props.currDate.getDate()}/${props.currDate.getMonth() +
						1}/${props.currDate.getFullYear()}`}</h2>
				</Row>
				<hr />
				<Row>
					<h2>Primers</h2>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].primers[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].primers[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].primers[2]}</p>
				</Row>
				<Row>
					<h2>Segons</h2>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].segons[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].segons[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].segons[2]}</p>
				</Row>
				<Row>
					<h2>Postres</h2>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].postres[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[dayOfTheWeek].postres[1]}</p>
				</Row>
				<Col className="text-center">
					<Button className="btn" id="Demanar" type="button" onClick={props.handleClick}>
						Demanar
					</Button>
				</Col>
				<Col className="text-center">
					<Button id="changeDate" className="btn" type="button" onClick={props.changeDate}>
						Canviar Dia
					</Button>
				</Col>
				<Col className="text-center">
					<Button id="backtoMain" type="button" onClick={props._backToMain} className="text-center mb-2">
						Enrrere
					</Button>
				</Col>
			</Container>
		);
	}
};

export default Step1;
