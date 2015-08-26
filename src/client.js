/**
 * External dependencies
 */

import React from 'react';
import { history } from 'react-router/lib/BrowserHistory';

/**
 * Internal dependencies
 */

import Root from 'components/data/root';
import createStore from 'utils/create-store';
import { APP_CONTAINER } from 'constants/dom';

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
	<Root history={ history } store={ store } />,
	document.querySelector( APP_CONTAINER )
);
