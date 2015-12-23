import { CHANGE_LOCATION, SWITCH_TIME_FORMAT, SWITCH_WEATHER_UNITS } from '../actions';

const default_settings = {
	time_format: '24',
	weather_location: '',
	weather_units: 'c',
};

export default function settings(state = default_settings, action) {
	switch (action.type) {
		case CHANGE_LOCATION:
			return Object.assign({}, state, {
				weather_location: action.location,
			});

		case SWITCH_WEATHER_UNITS:
			return Object.assign({}, state, {
				// ...state,
				weather_units: action.unit,
			});

		case SWITCH_TIME_FORMAT:
			return Object.assign({}, state, {
				time_format: action.format,
			});

		default:
			return state;
	}
}
