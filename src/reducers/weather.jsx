import { UPDATE_WEATHER_DATA, UPDATE_WEATHER_ID } from '../actions';

const default_settings = {
	data: null,
	place: null,
	last_fetch: 0,
};

export default function weather(state = default_settings, action) {
	switch (action.type) {
		case UPDATE_WEATHER_DATA:
			return Object.assign({}, state, {
				data: action.data,
				last_fetch: Date.now()
			});

		case UPDATE_WEATHER_ID:
			return Object.assign({}, state, {
				place: action.place_id
			});

		default:
			return state;
	}
}
