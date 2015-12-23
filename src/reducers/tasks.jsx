import { ADD_TASK, DELETE_TASK, SET_TASK_COMPLETION } from '../actions';

export default function tasks(state = [], action) {
	switch (action.type) {
		case ADD_TASK:
			return [
				...state,
				{
					id: state.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
					text: action.text,
					completed: false
				}
			];

		case SET_TASK_COMPLETION:
			return state.map(task =>
				task.id === action.id ?
					Object.assign({}, task, { completed: action.completed }) :
					task
			);

		case DELETE_TASK:
			return state.filter(task => task.id !== action.id);

		default:
			return state;
	}
}
