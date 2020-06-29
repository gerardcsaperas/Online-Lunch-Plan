import React from 'react';
import './App.css';

import Hero from './Hero';
import MenuForm from './MenuForm';

// Bootstrap
import { Container } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hero: true
		};
	}
	goToApp = () => {
		this.setState({
			hero: false
		});
	};
	render() {
		if (this.state.hero === true) {
			return (
				<Container fluid id="App">
					<Hero goToApp={this.goToApp} />
				</Container>
			);
		} else {
			return (
				<div id="App">
					<div id="backgroundWrap" />
					<div id="menuForm">
						<MenuForm />
					</div>
				</div>
			);
		}
	}
}

export default App;
