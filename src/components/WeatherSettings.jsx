import React, { Component, PropTypes } from 'react';
export default class Weather extends Component {

	componentDidMount() {
		if (!this.refs.location.value && "geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.props.onLocationChange(position.coords.latitude + ',' + position.coords.longitude);
			});
		}
	}

	handleLocationChange(e) {
		const location = this.refs.location;
		const text = location.value;
		this.props.onLocationChange(text);
	}

	handleUnitChange(e) {
		const value = e.target.value.trim();
		if ( value !== 'c' && value !== 'f' ) {
			return;
		}
		this.props.onUnitChange(value);
	}

	render() {
		let { location, unit } = this.props;

		return <form className="settings" onSubmit={ (e) => e.preventDefault() }>
			<input type="name" ref="location" value={ location }
				onChange={ (e) => this.handleLocationChange(e) } />
			<div className="units">
				<div>
					<input type="radio" name="units" id="units-c" value="c"
						onChange={ (e) => this.handleUnitChange(e) }
						checked={ unit === "c" } />
					<label htmlFor="units-c">&deg;C</label>
				</div>
				<div>
					<input type="radio" name="units" id="units-f" value="f"
						onChange={ (e) => this.handleUnitChange(e) }
						checked={ unit === "f" } />
					<label htmlFor="units-f">&deg;F</label>
				</div>
			</div>
		</form>;
	}
}
