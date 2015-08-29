/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';
import get from 'lodash/object/get';

/**
 * Internal dependencies
 */

import PostsData, { fetchPosts } from 'components/data/posts-data';
import PostsPage from 'components/ui/posts-page';

export default class PostsRoute extends Component {
	static propTypes = {
		params: PropTypes.object
	}

	static prepareServerRoute( params ) {
		const page = params.page || 1;
		return fetchPosts( { page } );
	}

	render() {
		const { params } = this.props;

		return (
			<PostsData page={ parseInt( params.page || 1, 10 ) }>
				<PostsPage />
			</PostsData>
		);
	}
}
