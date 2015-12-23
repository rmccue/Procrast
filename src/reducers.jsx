import { combineReducers } from 'redux';
import settings from './reducers/settings';
import tasks from './reducers/tasks';
import weather from './reducers/weather';

const reducer = combineReducers({
	settings,
	tasks,
	weather
});

export default reducer;
