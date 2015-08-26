/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

import toText from 'utils/html-to-text';
import Document from 'components/data/document';
import Post from 'components/ui/post';
import PostPlaceholder from 'components/ui/post-placeholder';

export default class PostPage extends Component {
	static propTypes = {
		post: PropTypes.object
	}

	render() {
		const { post } = this.props;

		let title;
		if ( post ) {
			title = post.title;
		}

		let description;
		if ( post ) {
			description = toText( post.excerpt.trim() );
		}

		return (
			<Document title={ title } description={ description }>
				{ post ? <Post post={ post } /> : <PostPlaceholder /> }
			</Document>
		);
	}
}
