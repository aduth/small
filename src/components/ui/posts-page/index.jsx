/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Document from 'components/data/document';
import PostsList from 'components/ui/posts-list';
import Pagination from 'components/ui/pagination';

export default class PostsPage extends Component {
	static propTypes = {
		page: PropTypes.number,
		hasMorePosts: PropTypes.bool,
		posts: PropTypes.arrayOf( PropTypes.object )
	}

	static defaultProps = {
		posts: Object.freeze( [] )
	}

	render() {
		const { posts, page, hasMorePosts } = this.props;

		return (
			<Document>
				<PostsList posts={ posts } />
				<Pagination
					page={ page }
					next={ hasMorePosts } />
			</Document>
		);
	}
}
