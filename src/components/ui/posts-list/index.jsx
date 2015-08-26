/**
 * External dependencies
 */

import React, { Component, PropTypes } from 'react/addons';
import times from 'lodash/utility/times';

/**
 * Internal dependencies
 */

import Post from 'components/ui/post';
import PostPlaceholder from 'components/ui/post-placeholder';

/**
 * Constants
 */

const NUMBER_OF_PLACEHOLDERS = 4;

export default class PostsList extends Component {
	static propTypes = {
		posts: PropTypes.arrayOf( PropTypes.object )
	}

	placeholders() {
		return times( NUMBER_OF_PLACEHOLDERS, () => ( {} ) );
	}

	render() {
		const { posts } = this.props;

		return (
			<ul className="posts-list">
				{ ( posts || this.placeholders() ).map( ( post, i ) => {
					return (
						<li key={ post.global_ID || i } className="posts-list__item">
							{ post.ID ? <Post post={ post } excerpt /> : <PostPlaceholder /> }
						</li>
					);
				} ) }
			</ul>
		);
	}
}
