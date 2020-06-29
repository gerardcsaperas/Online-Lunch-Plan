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
				<Row>
					<h2>Primers</h2>
				</Row>
				<Row>
					<p>{menuOf[1].primers[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[1].primers[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[1].primers[2]}</p>
				</Row>
				<Row>
					<h2>Segons</h2>
				</Row>
				<Row>
					<p>{menuOf[1].segons[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[1].segons[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[1].segons[2]}</p>
				</Row>
				<Row>
					<h2>Postres</h2>
				</Row>
				<Row>
					<p>{menuOf[1].postres[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[1].postres[1]}</p>
				</Row>
				<Col className="text-center">
					<Button id="Demanar" type="button" onClick={props.handleClick} className="text-center mb-2">
						Demanar
					</Button>
				</Col>
				<Col className="text-center">
					<Button id="changeDate" type="button" onClick={props.changeDate} className="text-center mb-2">
						Canviar Dia
					</Button>
				</Col>
			</Container>
		);
	}
	// The markup for Step1 UI
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
				<Button id="Demanar" type="button" onClick={props.handleClick}>
					Demanar
				</Button>
			</Col>
			<Col className="text-center">
				<Button id="changeDate" type="button" onClick={props.changeDate} className="text-center mb-2">
					Canviar Dia
				</Button>
			</Col>
		</Container>
	);
};

export default Step1;
