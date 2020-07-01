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
	_backToMain = () => {
		this.setState({
			hero: true
		});
	};
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
						<MenuForm _backToMain={this._backToMain} />
					</div>
				</div>
			);
		}
	}
}

export default App;
