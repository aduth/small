/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import Document from 'components/data/document';
import PostsList from 'components/ui/posts-list';

export default class HomePage extends Component {
	static propTypes = {
		posts: PropTypes.arrayOf( PropTypes.object )
	}

	static defaultProps = {
		posts: Object.freeze( [] )
	}

	render() {
		const { posts } = this.props;

		return (
			<Document title="Home">
				<PostsList posts={ posts } />
			</Document>
		);
	}
}
