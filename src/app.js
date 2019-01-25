import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import Root from '~/components/Root';
import { reducer } from '~/redux/index';

import './styles/index.scss';

class App
{
	constructor(cfg)
	{
		this.domNode = cfg.domNode;
		this.dev = cfg.dev;
	}

	_getCompose()
	{
		if(this.dev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
			return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
			{
				name: 'react-app',
				maxAge: 10,
				serialize: { options: false },
			});
		return compose;
	}

	_genPersister(orgId)
	{
		if(!DEV)
			// persist redux state in localStorage only and only
			// when it's DEV environment
			return null;

		return persistState(
			null, // persist a full state-tree
			{
				key: `redux`,
			});
	}

	_makeStore(orgId)
	{
		// @see https://github.com/zalmoxisus/redux-devtools-extension
		const fn = this._getCompose();
		const middlewares = fn(
			...[
				// @see https://github.com/gaearon/redux-thunk
				applyMiddleware(thunkMiddleware),
				this._genPersister(orgId),
			]
			.filter(Boolean));
		this._store = createStore(
			reducer,
			null, // initial value
			middlewares);
	}

	_st()
	{
		return this._store.getState();
	}

	_attachReact()
	{
		render(
			<Provider store={this._store}>
				<Root/>
			</Provider>,
			this.domNode,
			// callback,
		);
	}

	init()
	{
		this._makeStore();
		this._attachReact();
	}
}

const rootNode = document.querySelector('#root');
const app = window._engine = new App(
	{
		domNode: rootNode,
		dev: DEV,
	}
);
app.init();

if(DEV)
{
	window._app = app;
	window._store = app._store;
	window._st = app._store.getState;
}