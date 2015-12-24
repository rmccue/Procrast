import React, { Component, PropTypes } from 'react';
import { conditionType, updateWeather } from '../utilities/weather';
import Settings from './WeatherSettings';

const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
const HOUR_IN_MILLISECONDS = 60 * 60 * SECOND_IN_MILLISECONDS;

export default class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {expanded: false};
	}

	componentDidMount() {
		let now = new Date();

		// Run once a minute, starting on the next hour.
		let firstRun = ((HOUR_IN_SECONDS - now.getMinutes()) + (MINUTE_IN_SECONDS - now.getSeconds())) * SECOND_IN_MILLISECONDS;
		this.timeoutID = setTimeout(() => {
			this.interval = setInterval(() => this.updateWeather(), HOUR_IN_MILLISECONDS);
			this.updateWeather();
		}, firstRun);

		// If the data's older than an hour, run now.
		if (this.props.last_fetch < (Date.now() - HOUR_IN_MILLISECONDS)) {
			this.updateWeather();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.place !== nextProps.place) {
			// Trigger a reload of the weather data
			nextProps.onNeedsUpdate(nextProps.place);
		}
	}

	conditionIcon(type) {
		switch (type) {
			case 'tornado':
				return 'rainy-outline';

			case 'thunderstorms':
				return 'thunderstorm-outline';

			case 'snow':
				return 'snowy';

			case 'rain':
				return 'rainy-outline';

			case 'cloud-night':
				return 'cloudy-night-outline';

			case 'cloud-day':
				return 'partlysunny-outline';

			case 'night':
				return 'moon-outline';

			case 'sunny':
				return 'sunny-outline';

			default:
				return null;
		}
	}

	updateWeather() {
		if (this.props.place) {
			this.props.onNeedsUpdate(this.props.place);
		}
	}

	handleWidgetClick(e) {
		this.setState({
			expanded: ! this.state.expanded,
		});
	}

	render() {
		let { data, unit, location } = this.props;
		let conditionIcon = ( code ) => 'ion-ios-' + this.conditionIcon( conditionType( code ) );

		let temp = ( item ) => {
			let temp = parseInt( item );
			if ( unit === "c" ) {
				temp = Math.round(( temp - 32 ) * (5/9));
			}
			return temp;
		};

		let item = data ? data.item : null;
		let className = this.state.expanded ? "weather expanded" : "weather";

		return <div className={ className }>
			<div className="attribution">
				<a href="https://www.yahoo.com/?ilc=401"><img src="https://poweredby.yahoo.com/purple.png" /></a>
			</div>

			{item ? (
				<div className="widget" onClick={ (e) => this.handleWidgetClick() }>
					<div className="icon"><i className={ conditionIcon( item.condition.code ) } /></div>
					<div className="temp" title={ item.condition.text }>{ temp( item.condition.temp ) }&deg;</div>
				</div>
			): (
				<div className="widget">
					<div className="icon"><i className="ion-ios-partlysunny-outline" /></div>
					<div className="temp">??&deg;</div>
				</div>
			)}

			<Settings {...this.props} />

			{item ? (
				<div className="overlay">
					<ul className="forecast">
						{item.forecast.map((item, index) =>
							<li key={ index }>
								<div className="icon" title={ item.text }>
									<i className={ conditionIcon( item.code ) }></i>
								</div>
								<div className="day" title={ item.date }>{ item.day }</div>
								<div className="temp temp-high">{ temp( item.high ) }&deg;</div>
								<div className="temp temp-low">{ temp( item.low ) }&deg;</div>
							</li>
						)}
					</ul>
				</div>
			) : ""}
		</div>;
	}
}

Weather.propTypes = {
	onLocationChange: PropTypes.func.isRequired,
	onNeedsUpdate: PropTypes.func.isRequired,
	onUnitChange: PropTypes.func.isRequired,
};
