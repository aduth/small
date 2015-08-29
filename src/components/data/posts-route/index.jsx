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
		return fetchPosts( params );
	}

	render() {
		const { params } = this.props;

		let page = get( params, 'page' );
		if ( page ) {
			page = parseInt( page, 10 );
		}

		return (
			<PostsData page={ page }>
				<PostsPage />
			</PostsData>
		);
	}
}
