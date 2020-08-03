import React from 'react';
import './styles/ChangeDate.css';

// Bootstrap
import { Container, Row, Button } from 'react-bootstrap';

export default function ChangeDate(props) {
	let curr = new Date();
	const week = [];

	for (let i = 1; i <= 7; i++) {
		let first = curr.getDate() - curr.getDay() + i;
		let day = new Date(curr.setDate(first)).toLocaleDateString().slice(0, 10);
		week.push(day);
	}

	// Format date to Spanish format day/month/year
	const dateFormatter = (dateString) => {
		let day = dateString.split('/')[1];
		let month = dateString.split('/')[0];
		let year = dateString.split('/')[2];

		return `${day}/${month}/${year}`;
	};

	const buttonElementForDate = () => {
		const buttonElements = [];
		const day = [ 'Dill', 'Dim', 'Dmx', 'Dij', 'Div' ];

		// Checks if date is in the past and returns button disabled/enabled accordingly
		for (let i in [ 0, 1, 2, 3, 4 ]) {
			let now = new Date();

			// If the date is today, but it's past 11...
			if (now.getDay() === new Date(week[i]).getDay() && now.getHours() > 10) {
				buttonElements.push(
					<Row>
						<Button variant="secondary" className="day" onClick={props.selectDate} disabled>
							{day[i]} {dateFormatter(week[i])}
						</Button>
					</Row>
				);
				// If the date is today (still not 11) or in the future...
			} else if (now.getDay() <= new Date(week[i]).getDay()) {
				buttonElements.push(
					<Row>
						<Button variant="secondary" className="day" onClick={props.selectDate}>
							{day[i]} {dateFormatter(week[i])}
						</Button>
					</Row>
				);
				// If the date is in the past...
			} else {
				buttonElements.push(
					<Row>
						<Button variant="secondary" className="day" onClick={props.selectDate} disabled>
							{day[i]} {dateFormatter(week[i])}
						</Button>
					</Row>
				);
			}
		}

		return buttonElements;
	};

	if (props.currentStep === 1) {
		return null;
	} else if (props.currentStep === 'changeDate') {
		return (
			<Container id="dateSelector">
				<h1>Tria un dia</h1>
				{buttonElementForDate()}
				<Button onClick={props._toShowMenu}>Enrrere</Button>
				<p id="tempsMaxDemanar">*Només es pot demanar fins a les 11:00 AM del mateix dia.</p>
			</Container>
		);
	} else {
		return null;
	}
}
