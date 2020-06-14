import React from 'react';
import './MenuForm.css';
import Step1 from './Step1';
import Step2 from './Step2';

class MenuForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//State is used for storing data and user inputs
			currentStep: 1,
			menuType: ''
		};
	}
	render() {
		return (
			<section className="MenuForm">
				<Step1 currentStep={this.state.currentStep} />
				<Step2 currentStep={this.state.currentStep} />
				<Step3 currentStep={this.state.currentStep} menuType={this.state.menuType} />
			</section>
		);
	}
}

export default MenuForm;
