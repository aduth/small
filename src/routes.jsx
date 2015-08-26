/**
 * External dependencies
 */

import React from 'react';
import { Route } from 'react-router';

/**
 * Internal dependencies
 */

import BaseRoute from 'components/data/base-route';
import PostRoute from 'components/data/post-route';
import HomeRoute from 'components/data/home-route';
import NotFoundRoute from 'components/data/not-found-route';

export default [
	<Route component={ BaseRoute }>
		<Route path="/" component={ HomeRoute } />
		<Route path="/:year/:month/:date/:slug" component={ PostRoute } />
		<Route path="*" component={ NotFoundRoute } />
	</Route>
];
