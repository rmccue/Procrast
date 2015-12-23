import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTask, deleteTask, changeLocation, reloadWeather, setTaskCompletion, switchTimeFormat, switchWeatherUnits } from './actions';

import NewTask from './components/NewTask';
import Task from './components/Task';
import TaskList from './components/TaskList';
import Time from './components/Time';
import Weather from './components/Weather';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {background: "https://source.unsplash.com/daily"};
	}

	componentDidMount() {
		// Load Bing's image-of-the-day. Uncomment to activate.
		// this.timeout = setTimeout(() => this.loadBackground());
	}

	loadBackground() {
		let request = new XMLHttpRequest();
		request.open('GET', 'http://image-a-day.herokuapp.com/image');
		request.addEventListener("load", () => {
			if (request.readyState !== 4 || request.status !== 200) {
				return;
			}

			// Parse it.
			let data = JSON.parse(request.responseText);
			this.setState({
				background: data.imageUrl,
				copyright: data.copyright,
				copyrightLink: data.copyrightLink,
			});
		});
		request.send();
	}

	handleClick(e) {
	    const node = this.refs.input;
	    const text = node.value.trim();
	    node.value = '';

	    dispatch(addTodo(text));
	}

	render() {
		const { dispatch, settings, tasks, weather } = this.props;
		let style = { backgroundImage: "url(" + this.state.background + ")" };
		return (
			<div style={ style } id="app">
				<Weather
					{...weather}
					location={ settings.weather_location }
					unit={ settings.weather_units }
					onLocationChange={ location => dispatch(changeLocation(location)) }
					onNeedsUpdate={ location => dispatch(reloadWeather(location)) }
					onUnitChange={ unit => dispatch(switchWeatherUnits(unit)) }
					/>
				<Time
					format={ settings.time_format }
					onFormatChange={ format => dispatch(switchTimeFormat(format)) }
					/>
				<TaskList items={ tasks }
					onAdd={ text => dispatch(addTask(text)) }
					onSetCompleted={ (id, complete) => dispatch(setTaskCompletion(id, complete)) }
					onDelete={ id => dispatch(deleteTask(id)) }/>
				{ this.state.copyright ? (
					<p className="photocredit">
						<a href={ this.state.copyrightLink }>{ this.state.copyright }</a>
					</p>
					)
				: "" }
			</div>
		);
	}
}

function select(state) {
	return {
		settings: state.settings,
		tasks: state.tasks,
		weather: state.weather
	}
}

export default connect(select)(App)
