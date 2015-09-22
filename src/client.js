/**
 * External dependencies
 */

import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';

/**
 * Internal dependencies
 */

import Root from 'components/data/root';
import createStore from 'utils/create-store';
import { APP_CONTAINER } from 'constants/dom';
import routes from 'routes';

/**
 * Stylesheets
 */

import 'assets/stylesheets/main.scss';

/**
 * Initialize store
 */

const store = createStore( window.__hydrator__ );

/**
 * Render
 */

React.render(
	<Root store={ store }>
		{ () => <Router history={ createBrowserHistory() } routes={ routes } /> }
	</Root>,
	document.querySelector( APP_CONTAINER )
);
