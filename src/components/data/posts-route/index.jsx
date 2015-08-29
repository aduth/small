/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import PostsData, { fetchPosts } from 'components/data/posts-data';
import PostsPage from 'components/ui/posts-page';

export default class PostsRoute extends Component {
	static propTypes = {
		site: PropTypes.object
	}

	static prepareServerRoute() {
		return fetchPosts();
	}

	render() {
		return (
			<PostsData>
				<PostsPage />
			</PostsData>
		);
	}
}
