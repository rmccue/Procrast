import 'sugar-date';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import createStore, { STORAGE_KEY } from './createStore';
import DevTools from './DevTools';
import reducer from './reducers';

const initialEncoded = localStorage.getItem(STORAGE_KEY);
const initial = (initialEncoded && JSON.parse(initialEncoded)) || {};

let store = createStore(reducer, initial);

render(
	<Provider store={ store }>
		<div style={ { height: "100%" } }>
			<App />
			<DevTools />
		</div>
	</Provider>,
	document.getElementById('root')
);
