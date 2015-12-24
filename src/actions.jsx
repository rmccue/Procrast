import { findLocation, updateWeather } from './utilities/weather';

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const SET_TASK_COMPLETION = 'SET_TASK_COMPLETION';
export const SWITCH_TIME_FORMAT = 'SWITCH_TIME_FORMAT';
export const SWITCH_WEATHER_UNITS = 'SWITCH_WEATHER_UNITS';
export const UPDATE_WEATHER_DATA = 'UPDATE_WEATHER_DATA';
export const UPDATE_WEATHER_ID = 'UPDATE_WEATHER_ID';

export function addTask(text) {
	return { type: ADD_TASK, text };
}

export function deleteTask(id) {
	return { type: DELETE_TASK, id };
}

export function changeLocation(location) {
	let existingQuery = null;

	return dispatch => {
		// Update location immediately
		dispatch({ type: CHANGE_LOCATION, location });

		// Already running a query? Cancel it.
		if (existingQuery) {
			existingQuery.abort();
		}

		// Locate the place
		existingQuery = findLocation(location, place_id => {
			existingQuery = null;
			dispatch({ type: UPDATE_WEATHER_ID, place_id });
		});
	};
}

export function reloadWeather() {
	let existingQuery = null;

	return (dispatch, getState) => {
		// Already running a query? Cancel it.
		if (existingQuery) {
			existingQuery.abort();
		}

		let state = getState();
		if (!state.weather.place) {
			return;
		}

		existingQuery = updateWeather(state.weather.place, data => {
			existingQuery = null;
			dispatch({ type: UPDATE_WEATHER_DATA, data });
		});
	};
}

export function setTaskCompletion(id, completed) {
	return { type: SET_TASK_COMPLETION, id, completed };
}

export function switchTimeFormat(format) {
	return { type: SWITCH_TIME_FORMAT, format };
}

export function switchWeatherUnits(unit) {
	return { type: SWITCH_WEATHER_UNITS, unit };
}
