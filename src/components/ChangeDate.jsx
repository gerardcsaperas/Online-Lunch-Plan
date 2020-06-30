import React from 'react';
import './ChangeDate.css';

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

	if (props.currentStep === 1) {
		return null;
	} else if (props.currentStep === 'changeDate') {
		return (
			<Container id="dateSelector">
				<h1>Tria un dia</h1>
				<Row>
					<Button variant="secondary" className="day" onClick={props.selectDate}>
						Dill {dateFormatter(week[0])}
					</Button>
				</Row>
				<Row>
					<Button variant="secondary" className="day" onClick={props.selectDate}>
						Dim {dateFormatter(week[1])}
					</Button>
				</Row>
				<Row>
					<Button variant="secondary" className="day" onClick={props.selectDate}>
						Dix {dateFormatter(week[2])}
					</Button>
				</Row>
				<Row>
					<Button variant="secondary" className="day" onClick={props.selectDate}>
						Dij {dateFormatter(week[3])}
					</Button>
				</Row>
				<Row>
					<Button variant="secondary" className="day" onClick={props.selectDate}>
						Div {dateFormatter(week[4])}
					</Button>
				</Row>
			</Container>
		);
	} else {
		return null;
	}
}
