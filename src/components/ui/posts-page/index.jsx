/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Document from 'components/data/document';
import PostsList from 'components/ui/posts-list';

export default class PostsPage extends Component {
	static propTypes = {
		posts: PropTypes.arrayOf( PropTypes.object )
	}

	static defaultProps = {
		posts: Object.freeze( [] )
	}

	render() {
		const { posts } = this.props;

		return (
			<Document>
				<PostsList posts={ posts } />
			</Document>
		);
	}
}
