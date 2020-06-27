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
			<Container>
				<Row>
					<h1 className="menuType">El menú del dilluns</h1>
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
			</Container>
		);
	}
	// The markup for Step1 UI
	return (
		<div className="Step1">
			<h1 className="menuType">El menú d'avui</h1>
			<hr />
			<h2>Primers</h2>
			<p>{menuOf[dayOfTheWeek].primers[0]}</p>
			<p>{menuOf[dayOfTheWeek].primers[1]}</p>
			<p>{menuOf[dayOfTheWeek].primers[2]}</p>
			<h2>Segons</h2>
			<p>{menuOf[dayOfTheWeek].segons[0]}</p>
			<p>{menuOf[dayOfTheWeek].segons[1]}</p>
			<p>{menuOf[dayOfTheWeek].segons[2]}</p>
			<h2>Postres</h2>
			<p>{menuOf[dayOfTheWeek].postres[0]}</p>
			<p>{menuOf[dayOfTheWeek].postres[1]}</p>
		</div>
	);
};

export default Step1;
