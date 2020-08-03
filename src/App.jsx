import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Landing from './components/layout/Landing';
import DailyMenu from './components/DailyMenu';
import ChooseMenuType from './components/ChooseMenuType';

function App() {
	return (
		<Router>
			<Fragment>
				<Route exact path="/" component={Landing} />
				<Switch>
					<Route path="/menu-diari" component={DailyMenu} />
				</Switch>
			</Fragment>
		</Router>
	);
}

export default App;
