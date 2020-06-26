import React from 'react';
import './ChangeDate.css';

export default function ChangeDate(props) {
	let curr = new Date();
	const week = [];

	for (let i = 1; i <= 7; i++) {
		let first = curr.getDate() - curr.getDay() + i;
		let day = new Date(curr.setDate(first)).toLocaleDateString().slice(0, 10);
		week.push(day);
	}

	if (props.currentStep === 1) {
		return (
			<button id="changeDate" type="button" onClick={props.changeDate}>
				Canviar Dia
			</button>
		);
	} else if (props.currentStep === 'changeDate') {
		return (
			<div id="dateSelector">
				<h1>Tria un dia</h1>
				<button className="day" onClick={props.selectDate}>
					Dill {week[0]}
				</button>
				<button className="day" onClick={props.selectDate}>
					Dim {week[1]}
				</button>
				<button className="day" onClick={props.selectDate}>
					Dim {week[2]}
				</button>
				<button className="day" onClick={props.selectDate}>
					Dij {week[3]}
				</button>
				<button className="day" onClick={props.selectDate}>
					Div {week[4]}
				</button>
			</div>
		);
	} else {
		return null;
	}
}
