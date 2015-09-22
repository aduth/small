/**
 * External dependencies
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Internal dependencies
 */

import BaseRoute from 'components/data/base-route';
import PostRoute from 'components/data/post-route';
import PostsRoute from 'components/data/posts-route';
import NotFoundRoute from 'components/data/not-found-route';

export default [
	<Route path="/" component={ BaseRoute }>
		<IndexRoute component={ PostsRoute } />
		<Route path="/:year/:month/:date/:slug" component={ PostRoute } />
		<Route path="/tag/:tag" component={ PostsRoute } />
		<Route path="/category/:category" component={ PostsRoute } />
		<Route path="/page/:page" component={ PostsRoute } />
		<Route path="*" component={ NotFoundRoute } />
	</Route>
];
