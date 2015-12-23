import React, { Component } from 'react';
import moment from 'moment';

export default class Time extends Component {
	constructor(props) {
		super(props);
		this.state = {now: new Date()};
	}

	componentDidMount() {
		var now = new Date();

		// Run once a minute, starting on the next minute.
		this.timeoutID = setTimeout(() => {
			this.interval = setInterval(() => this.updateTime(), 60000);
			this.updateTime();
		}, (60 - now.getSeconds()) * 1000);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutID);
		clearInterval(this.interval);
	}

	updateTime() {
		this.setState({
			now: new Date(),
		});
	}

	handleFormatChange(e) {
		const value = e.target.value;
		if ( value !== '12' && value !== '24' ) {
			return;
		}

		this.props.onFormatChange(value);
	}

	render() {
		let { format } = this.props;
		let now = moment(this.state.now);
		let time = ( format === '12' ) ? now.format('h:mm') : now.format('H:mm');
		let meridian = ( format === '12' ) ? now.format('A') : null;
		return <div className="time">
			<div className="format">
				<div>
					<input type="radio" name="time-format" value="12"
						id="time-format-12"
						checked={ format === '12' }
						onClick={ (e) => this.handleFormatChange(e) } />
					<label htmlFor="time-format-12">12</label>
				</div>
				<div>
					<input type="radio" name="time-format" value="24"
						id="time-format-24"
						checked={ format === '24' }
						onClick={ (e) => this.handleFormatChange(e) } />
					<label htmlFor="time-format-24">24</label>
				</div>
			</div>
			<h1>
				{ time }
				{ meridian ?
					<span className="meridian">{ meridian }</span>
				: '' }
			</h1>
			<p className="date">{now.format("dddd, MMMM Do YYYY")}</p>
		</div>;
	}
}
