import React, { Component } from 'react';

import Attendees from './components/index';
import './App.css';
import { PNP_SETUP } from './utilities';
// setup default pnp options
PNP_SETUP();

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="burner">
					<div className="rsvp-container">
						<div className="topic">Elvino Music Concert</div>
				
					</div>
				</div>
				<div className="rsvp-container">
					<Attendees />
				</div>
			</div>
		);
	}
}

export default App;
