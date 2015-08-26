/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import PostsData, { fetchPosts } from 'components/data/posts-data';
import HomePage from 'components/ui/home-page';

export default class HomeRoute extends Component {
	static propTypes = {
		site: PropTypes.object
	}

	static prepareServerRoute() {
		return fetchPosts();
	}

	render() {
		return (
			<PostsData>
				<HomePage />
			</PostsData>
		);
	}
}
