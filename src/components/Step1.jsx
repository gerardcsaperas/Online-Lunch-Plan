import React from 'react';
import './Step1.css';

//Import menu data from a separate file in order to automatically update UI according to date
import menuOf from './menuData';

const Step1 = (props) => {
	let dayOfTheWeek = props.dayOfTheWeek;

	// Check for the current step
	if (props.currentStep !== 1) {
		return null;
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
