import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './DevTools';

export const STORAGE_KEY = 'procrast';

const persistence = store => next => action => {
	let result = next(action);

	// Update the stored values
	localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
	return result;
};

const finalCreateStore = compose(
	applyMiddleware(
		persistence,
		thunk
	),

	// Required! Enable Redux DevTools with the monitors you chose
	DevTools.instrument()
)(createStore);

export default finalCreateStore;
